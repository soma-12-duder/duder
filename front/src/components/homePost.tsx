/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/core';
import HorizontalLine from './HorizontalLine';
import {Colors} from '../util/Constants';
import HEART_ICON from '../assets/images/HEART_ICON.png';
import COMMENT_ICON from '../assets/images/COMMENT_ICON.png';

const fullWidth: number = Dimensions.get('window').width;

interface Props {
  text: String;
  km: String;
  nickname: String;
  like: String;
  commentNumber: String;
}

const HomePost = ({text, km, nickname, like, commentNumber}: Props) => {
  const navigation: any = useNavigation();

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PostScreen', {
            text: text,
          });
        }}>
        <PostWrapper>
          <Text
            style={{paddingTop: 7, paddingLeft: 7, paddingRight: 7}}
            numberOfLines={3}
            ellipsizeMode="tail">
            {text}
          </Text>
          <ProfileIconWrapper>
            <ProfileWrapper>
              <UserProfileImage
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5ebn2o15gmobO1xOj1ESvldLkPBxnC4ZwDg&usqp=CAU',
                }}
              />
              <Text>{nickname}</Text>
              <Text style={{fontWeight: 'bold'}}>{km}km</Text>
            </ProfileWrapper>
            <IconWrapper>
              <InnerIconWrapper>
                <Image
                  source={HEART_ICON}
                  resizeMode="contain"
                  style={{width: 13}}
                />
                <Text style={{paddingLeft: 2}}>{like}</Text>
              </InnerIconWrapper>
              <InnerIconWrapper>
                <Image
                  source={COMMENT_ICON}
                  resizeMode="contain"
                  style={{width: 13, top: 1}}
                />
                <Text style={{paddingLeft: 2}}>{commentNumber}</Text>
              </InnerIconWrapper>
            </IconWrapper>
          </ProfileIconWrapper>
        </PostWrapper>
      </TouchableOpacity>
      <HorizontalLine />
    </>
  );
};

export default HomePost;

const UserProfileImage = styled(Image)`
  width: 24px;
  height: 24px;
  border-radius: 100px;
`;

const IconWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 7px;
  padding-right: 7px;
`;

const InnerIconWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding-left: 6px;
  align-items: center;
`;

const ProfileWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  width: 38%;
  padding-left: 7px;
  padding-right: 7px;
`;

const ProfileIconWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PostWrapper = styled(View)`
  background-color: ${Colors.POST_BACKGROUND_COLOR};
  width: ${fullWidth};
`;
