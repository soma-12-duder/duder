import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import UtilText from '../util/UtilText';
import {LIGHT_GRAY} from '../util/Color';
import UtilProfile from '../util/UtilProfile';
import {parsingTime} from '../util/Utils';

interface Props {
  data: Object;
  picture: String;
}

const OpponentChatMessage = ({data, picture}: Props) => {
  const {content, created_at}: any = data;

  // useEffect(() => console.log('useChat!!!!!!!!!1'), []);

  return (
    <Wrapper>
      <UtilProfile picture={picture} />
      <MessageView>
        <UtilText content={content} />
      </MessageView>
      <TimeView>
        <UtilText content={parsingTime(created_at)} size="10" />
      </TimeView>
    </Wrapper>
  );
};

export default OpponentChatMessage;

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px;
  padding-left: 19px;
  height: auto;
  width: 50%;
`;

const MessageView = styled.View`
  background-color: ${LIGHT_GRAY};
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border-top-right-radius: 12px;
  padding: 18px 16px;
  margin-left: 12px;
`;

const TimeView = styled.View`
  justify-content: flex-end;
  padding-left: 5px;
  padding-bottom: 5px;
`;
