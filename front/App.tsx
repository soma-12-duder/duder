import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {RecoilRoot} from 'recoil';

import RootStack from './src/navigation/RootStack';

import {View, Text} from 'react-native';

import {setCustomText} from 'react-native-global-props';

const customTextProps = {
  style: {
    fontFamily: 'NotoSansKR-Medium',
    includeFontPadding: false,
    includeFontMargin: false,
  },
};

setCustomText(customTextProps);

const App = () => {
  console.disableYellowBox = true;

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
