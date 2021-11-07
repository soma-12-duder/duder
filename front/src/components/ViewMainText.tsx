/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import COMMENT_ICON2 from '../assets/images/COMMENT_ICON2.png';
import COORD_ICON from '../assets/images/COORD_ICON.png';
import HorizontalLine from './HorizontalLine';
import {postApi} from '../api/indexApi';

const fullWidth: number = Dimensions.get('window').width;

interface Props {
  id: number;
  content: String;
  member: any;
  distance: String;
  favorite_count: String;
  comment_count: String;
}

const ViewMainText = ({
  id,
  content,
  member,
  distance,
  favorite_count,
  comment_count,
}: Props) => {
  const [clicked, setClicked] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(favorite_count);
  const clickHeart = async () => {
    setClicked(!clicked);
    console.log(id);
    const a = await postApi.postPostFavorite(id);
    console.log('getFavorite:', a);
  };

  return (
    <>
      <View style={{width: fullWidth, backgroundColor: '#ffffff'}}>
        <ProfileKmWrapper>
          <ProfileWrapper>
            <UserProfileImage
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5ebn2o15gmobO1xOj1ESvldLkPBxnC4ZwDg&usqp=CAU',
              }}
            />
            <Text style={{fontSize: 18, paddingLeft: '1%'}}>
              {member.nickname}
            </Text>
          </ProfileWrapper>
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
        </ProfileKmWrapper>
        <HorizontalLine />
        <Text
          style={{paddingLeft: '4%', paddingTop: '4%'}}
          numberOfLines={3}
          ellipsizeMode="tail">
          {content}
        </Text>
        <IconWrapper>
          <InnerIconWrapper>
            <TouchableOpacity onPress={() => clickHeart()}>
              {clicked ? (
                <Ionicons name="heart" size={20} style={{}} />
              ) : (
                <Ionicons name="ios-heart-outline" size={20} style={{}} />
              )}
            </TouchableOpacity>
            <Text style={{paddingLeft: 2}}>{favorite_count}</Text>
          </InnerIconWrapper>
          <InnerIconWrapper>
            <Image
              source={COMMENT_ICON2}
              resizeMode="contain"
              style={{width: 14, top: 1}}
            />
            <Text style={{paddingLeft: 3}}>{comment_count}</Text>
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

const ProfileWrapper = styled(View)`
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
