/* eslint-disable react-native/no-inline-styles */
import React, {useLayoutEffect} from 'react';
import {View, Image, Text, Alert} from 'react-native';
import HorizontalLine from '../components/HorizontalLine';
import {useRecoilState} from 'recoil';
import {memberInfoState} from '../states/MemberState';
import styled from 'styled-components/native';
import PENCIL_ICON from '../assets/images/PENCIL_ICON.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {chatApi} from '../api/indexApi';

const OpponentProfileScreen = ({route, navigation}: any) => {
  const [myInfo, setMyInfo] = useRecoilState(memberInfoState);
  const {member} = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${myInfo.id === member.id ? '내 프로필' : '상대방 프로필'}`,
    });
  }, [navigation]);

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
              const {data} = await chatApi.chatWithOpponent(member?.id);
              console.log(member);
              console.log('chat_room_id:', data);
              navigation.navigate('ChatMessageScreen', {
                nickname: member.nickname,
                chatroom_id: data,
              });
            }}>
            <Text style={{color: '#ffffff'}}>
              {myInfo.id === member.id ? '나와 채팅하기' : '1대1 채팅하기'}
            </Text>
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
