import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LatestOrHotPostButton from '../components/buttons/latestOrHotPostButton';
import styled from 'styled-components/native';

const HeaderView = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
`;

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home</Text>
      <HeaderView>
        <LatestOrHotPostButton title={'최신게시물'}></LatestOrHotPostButton>
        <LatestOrHotPostButton title={'핫게시물'}></LatestOrHotPostButton>
      </HeaderView>
    </View>
  );
}

function ChattingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Chattings</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function () {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName = '';

            if (route.name === 'Home') {
              iconName = focused ? 'home-sharp' : 'home-outline';
            } else if (route.name === 'Chattings') {
              iconName = focused ? 'ios-chatbox' : 'chatbox-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Chattings" component={SettingsScreen} />
        <Tab.Screen name="Settings" component={ChattingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
