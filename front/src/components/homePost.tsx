import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/core';

const HomePost = ({text, km}: any) => {
  const navigation: any = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
      <PostWrapper>
        <Text
          style={{padding: 6, height: 70}}
          numberOfLines={3}
          ellipsizeMode="tail">
          {text}
        </Text>
        <View
          style={{
            alignSelf: 'stretch',
            borderBottomWidth: 1,
            borderBottomColor: '#E7E7E8',
            margin: 0,
            padding: 0,
            top: 2,
            height: 1,
          }}></View>
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
  background-color: #fffffe;
  width: 350px;
  height: 100px;
  border-radius: 10px;
`;
