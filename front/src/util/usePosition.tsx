import {useEffect, useState} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

function getCurrentPositionPromise() {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve(position);
        console.log('positionInGetCoord:', position);
      },
      error => {
        reject(new Error('getPosition error'));
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  });
}

export default () => {
  const [position, setPosition] = useState<any>(null);

  const getCoordinates = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if ('granted' === PermissionsAndroid.RESULTS.GRANTED) {
        try {
          const data = await getCurrentPositionPromise();
          setPosition(data);
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  function excuteGetCoordinates() {
    getCoordinates();
  }

  return [position, excuteGetCoordinates];
};
