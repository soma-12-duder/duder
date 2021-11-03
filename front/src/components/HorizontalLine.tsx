/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View} from 'react-native';

interface Props {
  width?: number;
}

const HorizontalLine = ({width = 100}: Props) => {
  return (
    <View
      style={{
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderBottomColor: '#E7E7E8',
        width: `${width}%`,
        margin: 0,
        left: `${(100 - width) / 2}%`,
        height: 0,
      }}
    />
  );
};

export default HorizontalLine;
