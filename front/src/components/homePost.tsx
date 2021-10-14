/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/core';
import HorizontalLine from './HorizontalLine';
import {Colors} from '../util/Constants';

interface Props {
  text: String;
  km: String;
}

const HomePost = ({text, km}: Props) => {
  const navigation: any = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('PostScreen')}>
      <PostWrapper>
        <Text
          style={{padding: 6, height: 70}}
          numberOfLines={3}
          ellipsizeMode="tail">
          {text}
        </Text>
        <HorizontalLine />
        <View style={{top: -37}}>
          <ProfileWrapper>
            <UserProfileImage
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5ebn2o15gmobO1xOj1ESvldLkPBxnC4ZwDg&usqp=CAU',
              }}
            />
            <Text style={{left: 5, top: 1}}>fumyparli</Text>
            <Text style={{left: 9, top: 1, fontWeight: 'bold'}}>{km}km</Text>
          </ProfileWrapper>
          <IconWrapper>
            <Ionicons name="heart" style={{left: -11}} />
            <Text style={{top: -4, left: -10}}>6</Text>
            <Ionicons name="md-chatbubble-ellipses-outline" />
            <Text style={{top: -4}}>15</Text>
          </IconWrapper>
        </View>
      </PostWrapper>
    </TouchableOpacity>
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
  background-color: ${Colors.POST_BACKGROUND_COLOR}
  width: 350px;
  height: 100px;
  border-radius: 10px;
`;
