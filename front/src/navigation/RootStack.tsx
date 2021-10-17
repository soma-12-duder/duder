import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screen/LoginScreen';
import BottomTab from './BottomTab';
import HomeScreen from '../screen/HomeScreen';
import PostScreen from '../screen/PostScreen';

const Stack = createStackNavigator();

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
          name={'BottomTab'}
          component={BottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen name={'PostScreen'} component={PostScreen} />
      </Stack.Navigator>
    </>
  );
};

export default RootStack;
