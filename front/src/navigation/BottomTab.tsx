import * as React from 'react';
import {Image, Button} from 'react-native';
import styled from 'styled-components/native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screen/HomeScreen';
import ChattingScreen from '../screen/ChattingScreen';
import SettingScreen from '../screen/SettingScreen';
import HOME_ICON from '../assets/images/HOME_ICON.png';
import HOME_ICON_FOCUS from '../assets/images/HOME_ICON_FOCUS.png';
import CHATTING_ICON from '../assets/images/CHATTING_ICON.png';
import CHATTING_ICON_FOCUS from '../assets/images/CHATTING_ICON_FOCUS.png';
import SETTING_ICON from '../assets/images/SETTING_ICON.png';
import SETTING_ICON_FOUCS from '../assets/images/SETTING_ICON_FOCUS.png';

const Tab: any = createBottomTabNavigator();

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
      screenOptions={({route}: any) => ({
        tabBarIcon: ({focused, color, size}: any) => {
          let iconName = '';

          if (route.name === '홈') {
            // iconName = focused ? 'home-sharp' : 'home-outline';
            return focused ? (
              <IconImage source={HOME_ICON_FOCUS} />
            ) : (
              <IconImage source={HOME_ICON} />
            );
          } else if (route.name === '채팅') {
            // iconName = focused ? 'ios-chatbox' : 'chatbox-outline';
            return focused ? (
              <IconImage source={CHATTING_ICON_FOCUS} />
            ) : (
              <IconImage source={CHATTING_ICON} />
            );
          } else if (route.name === '설정') {
            // iconName = focused ? 'settings' : 'settings-outline';
            return focused ? (
              <IconImage source={SETTING_ICON_FOUCS} />
            ) : (
              <IconImage source={SETTING_ICON} />
            );
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}
      tabBarOptions={{showLabel: false}}>
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="채팅" component={ChattingScreen} />
      <Tab.Screen name="설정" component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default BottomTab;

const IconImage = styled.Image`
  width: 24px;
  height: 24px;
`;
