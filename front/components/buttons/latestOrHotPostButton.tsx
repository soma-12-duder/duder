import * as React from 'react';
import {View, Alert, TouchableOpacity, Text} from 'react-native';
import styled from 'styled-components/native';

interface Props {
  title: string;
}

const LatestOrHotPostButton = styled(TouchableOpacity)`
  margin: 20px;
`;

export default ({title}: Props) => {
  return (
    <>
      <LatestOrHotPostButton
        onPress={() => Alert.alert('Button with adjusted color pressed')}>
        <Text>{title}</Text>
      </LatestOrHotPostButton>
    </>
  );
};
