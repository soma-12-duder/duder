import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/components/navigation/RootStack';

const App = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default App;
