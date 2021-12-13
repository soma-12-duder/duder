/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import HorizontalLine from '../components/HorizontalLine';
import UtilText from '../util/UtilText';
import {NK700, GRAY} from '../util/Color';
import DUDER_IMAGE from '../assets/images/DUDER_IMAGE.png';
import {parsingLastTime} from '../util/Utils';

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
  return (
    <>
      <ChattingWrapper
        onPress={() => onClick(opponent.nickname, chatroom_id, opponent)}>
        <ProfileNicknameTextWrapper>
          {opponent.profile ? (
            <UserProfileImage
              source={{
                uri: `${opponent.profile}`,
              }}
            />
          ) : (
            <UserProfileImage source={DUDER_IMAGE} resizeMode="contain" />
          )}
          <NicknameTextWrapper>
            <NicknameKmWrapper>
              <UtilText
                size={'15px'}
                content={opponent.nickname}
                family={NK700}
                style={{marginRight: 8}}
              />
              {/* <UtilText size={'15px'} content={km + 'km'} family={NK700} /> */}
            </NicknameKmWrapper>
            <Text style={{color: GRAY}} numberOfLines={1} ellipsizeMode="tail">
              {content}
            </Text>
          </NicknameTextWrapper>
        </ProfileNicknameTextWrapper>
        <DateChattingsNumberWrapper>
          <Text style={{fontSize: 10, paddingBottom: '7%', color: GRAY}}>
            {parsingLastTime(date)}
          </Text>
          {/* {chatroom_id && +chatroom_id > 0 ? (
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
          )} */}
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
  flex: 1.5;
  padding-right: 3%;
`;
