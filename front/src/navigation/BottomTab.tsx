import * as React from 'react';
import {Image, Button} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screen/HomeScreen';
import ChattingScreen from '../screen/ChattingScreen';
import SettingScreen from '../screen/SettingScreen';

const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      style={{width: 50, height: 50}}
      source={require('../assets/images/DUDER_IMAGE.png')}
    />
  );
}

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';

          if (route.name === '홈') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === '채팅') {
            iconName = focused ? 'ios-chatbox' : 'chatbox-outline';
          } else if (route.name === '설정') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="채팅" component={ChattingScreen} />
      <Tab.Screen name="설정" component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default BottomTab;
