import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, Image} from 'react-native';

import LoginScreen from '../screen/LoginScreen';
import BottomTab from './BottomTab';
import HomeScreen from '../screen/HomeScreen';
import PostScreen from '../screen/PostScreen';
import NicknameScreen from '../screen/NicknameScreen';

const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{width: 50, height: 50}}
      source={require('../assets/images/DUDER_IMAGE.png')}
    />
  );
}

const RootStack = () => {
  return (
    <>
      <Stack.Navigator initialRouteName={'LoginScreen'}>
        <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
        <Stack.Screen
          name={'LoginScreen'}
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'NicknameScreen'}
          component={NicknameScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'BottomTab'}
          component={BottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen name={'게시글'} component={PostScreen} />
      </Stack.Navigator>
    </>
  );
};

export default RootStack;
