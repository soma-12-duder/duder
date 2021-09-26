import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {RootStackParam} from '../../types/type';
import HomeScreen from '../../screen/HomeScreen';
import LoginScreen from '../../LoginScreen';
import DuderTab from './DuderTab';

const Stack = createStackNavigator<RootStackParam>();

const RootStack = () => {
  return (
    <>
      <Stack.Navigator initialRouteName={'DuderTab'}>
        <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
        <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
        <Stack.Screen
          name={'DuderTab'}
          component={DuderTab}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default RootStack;
