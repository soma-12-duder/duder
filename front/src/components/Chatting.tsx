/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import HorizontalLine from '../components/HorizontalLine';

interface Props {
  nickname: string;
  text: string;
  date: string;
  km: string;
  chattingNumber?: string;
}

const Chatting = ({nickname, text, date, km, chattingNumber}: Props) => {
  return (
    <>
      <ChattingWrapper>
        <ProfileNicknameTextWrapper>
          <UserProfileImage
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5ebn2o15gmobO1xOj1ESvldLkPBxnC4ZwDg&usqp=CAU',
            }}
          />
          <NicknameTextWrapper>
            <NicknameKmWrapper>
              <Text>{nickname}</Text>
              <Text style={{fontWeight: 'bold', paddingLeft: '3%'}}>
                {km}km
              </Text>
            </NicknameKmWrapper>
            <Text
              style={{color: '#757575'}}
              numberOfLines={1}
              ellipsizeMode="tail">
              {text}
            </Text>
          </NicknameTextWrapper>
        </ProfileNicknameTextWrapper>
        <DateChattingsNumberWrapper>
          <Text style={{paddingBottom: '7%'}}>{date}</Text>
          {chattingNumber && +chattingNumber > 0 ? (
            <View
              style={{
                backgroundColor: '#C58852',
                width: 24,
                height: 24,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#ffffff'}}>2</Text>
            </View>
          ) : (
            <View style={{height: 24}}></View>
          )}
        </DateChattingsNumberWrapper>
      </ChattingWrapper>
      <HorizontalLine />
    </>
  );
};

export default Chatting;

const UserProfileImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 100px;
`;

const NicknameKmWrapper = styled(View)`
  flex-direction: row;
`;

const NicknameTextWrapper = styled(View)`
  flex: 1;
  padding-left: 4%;
`;

const ProfileNicknameTextWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  flex: 3;
`;

const DateChattingsNumberWrapper = styled(View)`
  justify-content: center;
  align-items: flex-end;
  flex: 1;
  padding-right: 3%;
`;

const ChattingWrapper = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
  height: 10%;
  padding-left: 3%;
`;
