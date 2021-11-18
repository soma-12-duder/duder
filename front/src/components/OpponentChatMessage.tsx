import React from 'react';
import styled from 'styled-components/native';
import UtilText from '../util/UtilText';
import {LIGHT_GRAY} from '../util/Color';

interface Props {
  data: Object;
  picture: String;
}

const UserChatMessage = ({data, picture}: Props) => {
  const {content, created_at}: any = data;
  const re = /\d+/g;
  const parsingTime = (date: string) => {
    if (date == null) return;
    const time: any = date?.match(re);
    const now = new Date();
    const nowMonth: any = now.getMonth() + 1;
    const nowDate: any = now.getDate();
    if (+time[1] === +nowMonth && +time[2] === +nowDate) {
      return `${time[3]}시 ${time[4]}분`;
    } else {
      return `${time[1]}월 ${time[2]}일 ${time[3]}시 ${time[4]}분`;
    }
  };

  return (
    <Wrapper>
      <UserProfile>
        <ProfileImage
          source={{uri: 'https://placeimg.com/140/140/any'}}></ProfileImage>
      </UserProfile>
      <MessageView>
        <UtilText content={content} />
      </MessageView>
      <TimeView>
        <UtilText content={parsingTime(created_at)} size="10" />
      </TimeView>
    </Wrapper>
  );
};

export default UserChatMessage;

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px;
  padding-left: 19px;
  height: auto;
  width: 50%;
`;

const UserProfile = styled.View`
  width: 40px;
  height: 40px;
  margin-right: 16px;
`;

const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 100px;
`;

const MessageView = styled.View`
  background-color: ${LIGHT_GRAY};
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border-top-right-radius: 12px;
  padding: 18px 16px;
`;

const TimeView = styled.View`
  justify-content: flex-end;
  padding-left: 5px;
  padding-bottom: 5px;
`;
