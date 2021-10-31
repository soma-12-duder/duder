/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import HorizontalLine from '../components/HorizontalLine';
import {Colors} from '../util/Constants';

interface Props {
  comment: String;
  commentOfComment: boolean;
}

const ViewCommentText = ({comment, commentOfComment}: Props) => {
  return (
    <>
      <ProfileWrapper>
        <UserProfileImage
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5ebn2o15gmobO1xOj1ESvldLkPBxnC4ZwDg&usqp=CAU',
          }}
        />
        <Text style={{fontSize: 20}}>fumyparli</Text>
      </ProfileWrapper>
    </>
  );
};

export default ViewCommentText;

const ProfileWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 34%;
`;

const UserProfileImage = styled(Image)`
  width: 35px;
  height: 35px;
  border-radius: 100px;
`;
