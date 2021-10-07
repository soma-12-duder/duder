import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {RecoilRoot} from 'recoil';

import RootStack from './src/navigation/RootStack';

const App = () => {
  return (
    <SafeAreaProvider>
      <RecoilRoot>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </RecoilRoot>
    </SafeAreaProvider>
  );
};

export default App;
