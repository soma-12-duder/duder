import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import TabNavigation from './src/navigation/tabs';

export default function App() {
  return (
    <SafeAreaProvider>
      <TabNavigation />
    </SafeAreaProvider>
  );
}
