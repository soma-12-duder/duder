/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View} from 'react-native';

const HorizontalLine = () => {
  return (
    <View
      style={{
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderBottomColor: '#E7E7E8',
        margin: 0,
        padding: 0,
        top: -40,
        height: 1,
      }}
    />
  );
};

export default HorizontalLine;
