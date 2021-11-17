import React from 'react';
import styled from 'styled-components/native';
import UtilText from '../util/UtilText';
import {BROWN} from '../util/Color';

interface Props {
  data: Object;
  picture: String;
}

const UserChatMessage = ({data, picture}: Props) => {
  const {content, created_at}: any = data;
  const re = /\d+/g;
  const time = created_at.match(re);
  return (
    <MessageContainer>
      <Wrapper>
        <TimeView>
          <UtilText content={`${time[3]}:${time[4]}`} />
        </TimeView>
        <MessageView>
          <UtilText content={content} color={'white'} />
        </MessageView>
      </Wrapper>
    </MessageContainer>
  );
};

export default UserChatMessage;

const MessageContainer = styled.View`
  display: flex;
  align-items: flex-end;
  width: 100%;
`;

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 10px;
  padding-right: 19px;
  height: auto;
  width: 50%;
`;

const TimeView = styled.View`
  padding-right: 5px;
  padding-bottom: 5px;
`;

const MessageView = styled.View`
  background-color: ${BROWN};
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border-top-left-radius: 12px;
  padding: 18px 16px;
`;
