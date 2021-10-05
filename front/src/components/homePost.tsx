import * as React from 'react';
import {View, Text, Image} from 'react-native';
import styled from 'styled-components/native';

export default () => {
  return (
    <>
      <Text>상수역 맛집 추천좀요</Text>
      <View>
        <UserProfileImage
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5ebn2o15gmobO1xOj1ESvldLkPBxnC4ZwDg&usqp=CAU',
            // uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
      </View>
    </>
  );
};

const UserProfileImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 100px;
`;
