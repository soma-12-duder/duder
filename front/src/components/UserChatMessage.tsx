import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import UtilText from '../util/UtilText';
import {BROWN} from '../util/Color';
import {parsingTime} from '../util/Utils';

interface Props {
  data: Object;
}

const UserChatMessage = ({data}: Props) => {
  const {content, created_at}: any = data;

  // useEffect(() => console.log('useChat!!!!!!!!!1'), []);

  return (
    <MessageContainer>
      <Wrapper>
        <TimeView>
          <UtilText content={parsingTime(created_at)} size="10" />
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
