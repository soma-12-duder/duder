/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/core';
import HorizontalLine from './HorizontalLine';
import {Colors} from '../util/Constants';
import HEART_ICON from '../assets/images/HEART_ICON.png';
import HEART_ICON_BLACK from '../assets/images/HEART_ICON_BLACK.png';
import COMMENT_ICON from '../assets/images/COMMENT_ICON.png';
import COORD_ICON from '../assets/images/COORD_ICON.png';

const fullWidth: number = Dimensions.get('window').width;

interface Props {
  id: number;
  content: String;
  distance: String;
  member: any;
  favorite_count: String;
  comment_count: String;
}

const ProfilePost = ({
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
          <Text numberOfLines={1} ellipsizeMode="tail">
            {content}
          </Text>
          <ProfileIconWrapper>
            <Text style={{color: '#cfcfcf'}}>2021-11-16</Text>
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
              </InnerIconWrapper>
            </IconWrapper>
          </ProfileIconWrapper>
        </PostWrapper>
      </TouchableOpacity>
      <HorizontalLine />
    </>
  );
};

export default ProfilePost;

const IconWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 7px 0px 7px 7px;
`;

const InnerIconWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding-left: 6px;
  align-items: center;
`;

const ProfileIconWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PostWrapper = styled(View)`
  background-color: ${Colors.POST_BACKGROUND_COLOR};
  width: ${fullWidth};
  padding: 7px 7px 7px 12px;
`;
