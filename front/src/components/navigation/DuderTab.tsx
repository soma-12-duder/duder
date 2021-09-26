import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screen/HomeScreen';
import LoginScreen from '../../LoginScreen';
import {BottomTabParam} from '../../types/type';
import {Text, View} from 'react-native';

interface TabConfig {
  tabName: String;
  title: String;
  component: any;
}

const DuderTab = () => {
  const Tab = createBottomTabNavigator<BottomTabParam>();

  const tabConfig: TabConfig[] = [
    {
      tabName: 'home',
      title: '홈',
      component: HomeScreen,
    },
    {
      tabName: 'login',
      title: '로그인',
      component: LoginScreen,
    },
  ];

  return (
    <Tab.Navigator>
      {/* {tabConfig.map((tab, index) => {
        return (
          <Tab.Screen
            key={`${tab.tabName} ${index}`}
            name={tab.tabName}
            component={tab.component}
          />
        );
      })} */}
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'home',
          tabBarIcon: ({}) => (
            <View
              style={{
                width: '50%',
                height: '50%',
                backgroundColor: 'gray',
              }}>
              <Text>탭 아이콘</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: 'login',
          tabBarIcon: ({}) => (
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'yellow',
              }}>
              <Text>탭 아이콘</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default DuderTab;
