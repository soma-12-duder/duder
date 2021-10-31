/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import UtilButton from '../util/UtilButton';

const ChattingScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>채팅</Text>
      <UtilButton
        onPress={''}
        height={50}
        width={150}
        content={'유틸 버튼 테스트용.'}
      />
    </View>
  );
};

export default ChattingScreen;
