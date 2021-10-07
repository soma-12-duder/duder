import * as React from 'react';
import {View, Text, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

const HomePost = () => {
  return (
    <PostWrapper>
      <Text style={{padding: 6}}>상수역 맛집 추천좀요</Text>
      <View>
        <ProfileWrapper>
          <UserProfileImage
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5ebn2o15gmobO1xOj1ESvldLkPBxnC4ZwDg&usqp=CAU',
            }}
          />
          <Text style={{left: 5}}>fumyparli</Text>
        </ProfileWrapper>
        <IconWrapper>
          <Ionicons name="heart" style={{left: -11}} />
          <Text style={{top: -4, left: -10}}>6</Text>
          <Ionicons name="md-chatbubble-ellipses-outline" />
          <Text style={{top: -4}}>15</Text>
        </IconWrapper>
      </View>
    </PostWrapper>
  );
};

export default HomePost;

const UserProfileImage = styled(Image)`
  width: 22px;
  height: 22px;
  border-radius: 100px;
`;

const IconWrapper = styled(View)`
  flex-direction: row;
  justify-content: flex-end;
  padding: 5px;
`;

const ProfileWrapper = styled(View)`
  flex-direction: row;
  justify-content: flex-start;
  margin: 10px;
  top: 30px;
`;

const PostWrapper = styled(View)`
  margin: 7px;
  background-color: gray;
  width: 350px;
  height: 100px;
  border-radius: 10px;
`;
