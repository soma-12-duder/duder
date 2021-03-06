/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/core';
import HorizontalLine from './HorizontalLine';
import {Colors} from '../util/Constants';
import HEART_ICON from '../assets/images/HEART_ICON.png';
import COMMENT_ICON from '../assets/images/COMMENT_ICON.png';
import COORD_ICON from '../assets/images/COORD_ICON.png';
import DUDER_IMAGE from '../assets/images/DUDER_IMAGE.png';

const fullWidth: number = Dimensions.get('window').width;

interface Props {
  id: number;
  content: String;
  distance: String;
  member: any;
  favorite_count: String;
  comment_count: String;
  isProfile?: any;
}

const HomePost = ({
  id,
  content,
  distance,
  member,
  favorite_count,
  comment_count,
}: Props) => {
  const navigation: any = useNavigation();

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('게시글', {
            id: id,
            content: content,
            member: member,
            favorite_count: favorite_count,
            comment_count: comment_count,
            distance: distance,
          });
        }}>
        <PostWrapper>
          <Text
            style={{marginBottom: 20}}
            numberOfLines={3}
            ellipsizeMode="tail">
            {content}
          </Text>
          <ProfileIconWrapper>
            <ProfileWrapper>
              {member.profile ? (
                <UserProfileImage
                  source={{
                    uri: `${member.profile}`,
                  }}
                />
              ) : (
                <UserProfileImage source={DUDER_IMAGE} resizeMode="contain" />
              )}
              <Text style={{paddingLeft: 8}}>{member.nickname}</Text>
            </ProfileWrapper>
            <IconWrapper>
              <InnerIconWrapper>
                <Image
                  source={HEART_ICON}
                  resizeMode="contain"
                  style={{width: 14, height: 14}}
                />
                <Text style={{paddingLeft: 4}}>{favorite_count}</Text>
              </InnerIconWrapper>
              <InnerIconWrapper>
                <Image
                  source={COMMENT_ICON}
                  resizeMode="contain"
                  style={{width: 13, height: 13, top: 0.55}}
                />
                <Text style={{paddingLeft: 5, paddingRight: 12}}>
                  {comment_count}
                </Text>
                <Image
                  source={COORD_ICON}
                  resizeMode="contain"
                  style={{width: 13, height: 15, top: 0.5}}
                />
                <Text
                  style={{
                    fontFamily: 'NotoSansKR-Bold',
                    paddingLeft: 2.5,
                    fontSize: 15,
                    color: '#CA925D',
                  }}>
                  {distance}km
                </Text>
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
  border-radius: 12px;
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
  padding: 17px 17px 17px 17px;
`;
