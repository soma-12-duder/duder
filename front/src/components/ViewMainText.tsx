/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import COMMENT_ICON2 from '../assets/images/COMMENT_ICON2.png';
import COORD_ICON from '../assets/images/COORD_ICON.png';
import HEART_ICON from '../assets/images/HEART_ICON.png';
import HEART_ICON_BLACK from '../assets/images/HEART_ICON_BLACK.png';
import HorizontalLine from './HorizontalLine';

import {useRecoilState} from 'recoil';
import {postState} from '../states/MemberState';
import {postApi} from '../api/indexApi';

import {useNavigation} from '@react-navigation/core';

const fullWidth: number = Dimensions.get('window').width;

interface Props {
  id: number;
  distance: string;
  photo_urls: [];
  member: any;
  isProfile: any;
}

const ViewMainText = ({id, distance, photo_urls, member, isProfile}: Props) => {
  const navigation: any = useNavigation();

  const [post, setPost] = useRecoilState(postState);
  const [timer, setTimer]: any = useState();
  const clickHeart = async () => {
    const prevFavorite_state = post.favorite_state;
    const prevFavorite_count = post.favorite_count;
    setPost((post: any) => {
      return {
        ...post,
        favorite_state: !prevFavorite_state,
      };
    });

    if (timer) {
      clearTimeout(timer);
    }
    let timerToSet;
    if (!post.favorite_state) {
      setPost((post: any) => {
        return {
          ...post,
          favorite_count: prevFavorite_count + 1,
        };
      });
      timerToSet = setTimeout(async () => {
        const data = await postApi.postPostFavorite(id);
        console.log('++', data);
      }, 1000);
    } else {
      setPost((post: any) => {
        return {
          ...post,
          favorite_count: prevFavorite_count - 1,
        };
      });
      timerToSet = setTimeout(async () => {
        const data = await postApi.deletePostFavorite(id);
        console.log('--', data);
      }, 1000);
    }
    setTimer(timerToSet);
  };

  return (
    <>
      <View style={{width: fullWidth, backgroundColor: '#ffffff'}}>
        <ProfileKmWrapper>
          <ProfileWrapper
            onPress={() =>
              navigation.navigate('상대방 프로필', {member: member})
            }>
            <UserProfileImage
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5ebn2o15gmobO1xOj1ESvldLkPBxnC4ZwDg&usqp=CAU',
              }}
            />
            <Text style={{fontSize: 18, paddingLeft: '1%'}}>
              {post?.member?.nickname}
            </Text>
          </ProfileWrapper>
          {isProfile || (
            <CoordKmWrapper>
              <Image
                source={COORD_ICON}
                resizeMode="contain"
                style={{width: 13}}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  paddingLeft: 4,
                  color: '#CA925D',
                }}>
                {distance}km
              </Text>
            </CoordKmWrapper>
          )}
        </ProfileKmWrapper>
        <HorizontalLine />
        <Text
          style={{paddingLeft: '4%', paddingTop: '4%'}}
          numberOfLines={3}
          ellipsizeMode="tail">
          {post?.content}
        </Text>
        {photo_urls ? (
          <PhotoWarrper>
            {photo_urls.map(url => (
              <Photo
                source={{uri: url}}
                resizeMode="cover"
                style={{width: '40%', height: 100}}></Photo>
            ))}
          </PhotoWarrper>
        ) : (
          <></>
        )}
        <IconWrapper>
          <InnerIconWrapper>
            <TouchableOpacity onPress={() => clickHeart()}>
              {post?.favorite_state ? (
                <Image
                  source={HEART_ICON_BLACK}
                  resizeMode="contain"
                  style={{width: 17}}
                />
              ) : (
                <Image
                  source={HEART_ICON}
                  resizeMode="contain"
                  style={{width: 17}}
                />
              )}
            </TouchableOpacity>
            <Text style={{paddingLeft: 2}}>{post?.favorite_count}</Text>
          </InnerIconWrapper>
          <InnerIconWrapper>
            <Image
              source={COMMENT_ICON2}
              resizeMode="contain"
              style={{width: 14, top: 1}}
            />
            <Text style={{paddingLeft: 3}}>{post?.comment_count}</Text>
          </InnerIconWrapper>
        </IconWrapper>
      </View>
      <HorizontalLine />
    </>
  );
};

export default ViewMainText;

const UserProfileImage = styled(Image)`
  width: 35px;
  height: 35px;
  border-radius: 100px;
`;

const CoordKmWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const ProfileWrapper = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ProfileKmWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 4%;
  padding-right: 4%;
  padding-bottom: 1%;
`;

const IconWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 21%;
  padding-left: 4%;
`;

const InnerIconWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 30%;
`;

const PhotoWarrper = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Photo = styled.Image`
  margin: 4% 4% 0 4%;
`;
