/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {
  StyleSheet,
  Dimensions,
  FlatList,
  View,
  PermissionsAndroid,
  Platform,
  Image,
  Text,
  Alert,
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import ProfilePost from '../components/ProfilePost';
import HomeNotice from '../components/HomeNotice';
import HorizontalLine from '../components/HorizontalLine';
import {postApi} from '../api/indexApi';
import Geolocation from 'react-native-geolocation-service';
import {useRecoilState} from 'recoil';
import {postsState, hotPostsState} from '../states/MemberState';
import {useNavigation} from '@react-navigation/core';
import styled from 'styled-components/native';
import usePosition from '../util/usePosition';
import PENCIL_ICON from '../assets/images/PENCIL_ICON.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {chatApi} from '../api/indexApi';

const initialLayout = {width: Dimensions.get('window').width};

const OpponentProfileScreen = ({route, navigation}: any) => {
  return (
    <>
      <HorizontalLine />
      <View
        style={{
          backgroundColor: '#ffffff',
          height: '100%',
        }}>
        <ProfilePictureAndNickName>
          <ProfileImage
            source={{
              uri: 'https://soma12-s3.s3.ap-northeast-2.amazonaws.com/profile/testbeen.png',
            }}
          />
          <TouchableOpacity>
            <NicknameAndIcon>
              <Text>승패</Text>
              <Image
                source={PENCIL_ICON}
                style={{width: 13, height: 13, top: 1, marginLeft: 3}}
              />
            </NicknameAndIcon>
          </TouchableOpacity>
        </ProfilePictureAndNickName>
        <ButtonWrapper>
          <OneOnOneChattingButton
            onPress={async () => {
              const {data} = await chatApi.chatWithOpponent(
                route?.params?.member?.id,
              );
              const member = route.params.member;
              console.log(route.params.member);
              console.log('chat_room_id:', data);
              navigation.navigate('ChatMessageScreen', {
                nickname: member.nickname,
                chatroom_id: data,
              });
            }}>
            <Text style={{color: '#ffffff'}}>1대1 채팅하기</Text>
          </OneOnOneChattingButton>
          <ReportButton onPress={() => Alert.alert('접수 되었습니다.')}>
            <Text style={{color: '#000000'}}>신고하기</Text>
          </ReportButton>
        </ButtonWrapper>
      </View>
    </>
  );
};

export default OpponentProfileScreen;

const ProfilePictureAndNickName = styled.View`
  justify-content: center;
  align-items: center;
  padding: 60px 30px 50px 30px;
`;

const NicknameAndIcon = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfileImage = styled.Image`
  width: 90;
  height: 90;
  border-radius: 45;
`;

const OneOnOneChattingButton = styled.TouchableOpacity`
  background-color: #ca925d;
  width: 80%;
  height: 20%;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 5;
`;

const ReportButton = styled.TouchableOpacity`
  background-color: #cfcfcf;
  width: 80%;
  height: 20%;
  justify-content: center;
  align-items: center;
  border-radius: 5;
`;

const ButtonWrapper = styled.View`
  align-items: center;
`;
