/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components';

interface Props {
  text: String;
}

const HomeNotice = ({text}: Props) => {
  return (
    <NoticeView>
      <Text style={{padding: 4, color: '#F6F6F6'}}>공지: {text}</Text>
    </NoticeView>
  );
};

const NoticeView = styled(View)`
  margin: 7px;
  background-color: #000000;
  width: 91%;
  height: 8%;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

export default HomeNotice;
