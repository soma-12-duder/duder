/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';
import HorizontalLine from '../components/HorizontalLine';
import UtilText from '../util/UtilText';
import {NK700, GRAY, BROWN} from '../util/Color';

interface Props {
  opponent: any;
  date: string;
  km: string;
  chatroom_id?: string;
  content?: string;
  onClick: Function;
}

const Chatting = ({
  opponent,
  chatroom_id,
  date,
  km,
  onClick,
  content,
}: Props) => {
  const re = /\d+/g;
  const parsingTime = (date: string) => {
    if (date == null) return;
    const time: any = date?.match(re);
    return `${time[1]}월 ${time[2]}일 \n${time[3]}시 ${time[4]}분`;
  };

  return (
    <>
      <ChattingWrapper onPress={() => onClick(opponent.nickname, chatroom_id)}>
        <ProfileNicknameTextWrapper>
          <UserProfileImage
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5ebn2o15gmobO1xOj1ESvldLkPBxnC4ZwDg&usqp=CAU',
            }}
          />
          <NicknameTextWrapper>
            <NicknameKmWrapper>
              <UtilText
                size={'15px'}
                content={opponent.nickname}
                family={NK700}
                style={{marginRight: 8}}
              />
              <UtilText size={'15px'} content={km + 'km'} family={NK700} />
            </NicknameKmWrapper>
            <Text style={{color: GRAY}} numberOfLines={1} ellipsizeMode="tail">
              {content}
            </Text>
          </NicknameTextWrapper>
        </ProfileNicknameTextWrapper>
        <DateChattingsNumberWrapper>
          <Text style={{fontSize: 10, paddingBottom: '7%'}}>
            {parsingTime(date)}
          </Text>
          {chatroom_id && +chatroom_id > 0 ? (
            <View
              style={{
                backgroundColor: BROWN,
                width: 16,
                height: 16,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#ffffff', fontSize: 10}}>2</Text>
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

const ChattingWrapper = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  height: 11%;
  padding-horizontal: 20;
`;

const UserProfileImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 100px;
`;

const NicknameKmWrapper = styled.View`
  font-family: 'NotoSansKR-Bold';
  flex-direction: row;
`;

const NicknameTextWrapper = styled.View`
  flex: 1;
  padding-left: 4%;
`;

const ProfileNicknameTextWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 3;
`;

const DateChattingsNumberWrapper = styled.View`
  justify-content: center;
  align-items: flex-end;
  flex: 1;
  padding-right: 3%;
`;
