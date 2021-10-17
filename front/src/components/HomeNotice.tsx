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
      <Text style={{padding: 4}}>공지: {text}</Text>
    </NoticeView>
  );
};

const NoticeView = styled(View)`
  margin: 7px;
  background-color: #f9cf5b;
  width: 350px;
  height: 30px;
  border-radius: 10px;
`;

export default HomeNotice;
