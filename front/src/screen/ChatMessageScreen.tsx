/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import TextInputButton from '../components/TextInputButton';
import styled from 'styled-components/native';
import {useRecoilValue} from 'recoil';
import {memberInfoState} from '../states/MemberState';
import UserChatMessage from '../components/UserChatMessage';
import OpponentChatMessage from '../components/OpponentChatMessage';
import {chatApi} from '../api/indexApi';

interface Props {
  nickname: String;
}

const CHAT_URL = 'http://52.79.234.33:8080';
const SockJS = require('sockjs-client/dist/sockjs.js');
const Stomp = require('stompjs/lib/stomp').Stomp;

const ChatMessageScreen = ({route, navigation}: any) => {
  const member = useRecoilValue(memberInfoState);
  const [messages, setMessages]: any = useState([]);
  const [content, setContent]: any = useState('');
  const [loading, setLoading] = useState(true);
  const {nickname, chatroom_id, opponent} = route.params;

  const socket = new SockJS(`${CHAT_URL}/chat`);
  const stompClient = Stomp.over(socket);

  const connect = () => {
    stompClient.connect({}, (frame: any) => {
      setLoading(false);
      console.log('connected', +frame);
      stompClient.subscribe('/pop/message', function (chat: any) {
        console.log(JSON.parse(chat.body).data);
        setMessages((prevState: any) => [
          ...prevState,
          JSON.parse(chat.body).data,
        ]);
      });
    });
  };

  function onChangeText(e: any) {
    setContent(e);
  }

  function sendChat() {
    if (content === null || content === '') {
      return;
    }
    stompClient.send(
      '/queue/message',
      {},
      JSON.stringify({
        room_id: chatroom_id,
        sender_id: member.id,
        sender_nickname: member.nickname,
        content: content,
      }),
    );
    setContent('');
  }

  const getData = async () => {
    const {status, data}: any = await chatApi.findAllChatMessage(chatroom_id);
    if (status === 200) {
      console.log(data);
      setMessages(data);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${nickname}`,
    });
  }, [navigation]);

  useEffect(() => {
    getData();
    connect();
  }, []);

  const flatListRef: any = useRef();

  const renderItem = ({item, index}: any) => {
    return item.sender_id === member.id ? (
      <UserChatMessage key={index} data={item} />
    ) : (
      <OpponentChatMessage key={index} data={item} picture={opponent.profile} />
    );
  };

  return (
    <Wrapper>
      <FlatList
        style={{height: '90%'}}
        ref={flatListRef}
        onContentSizeChange={() =>
          flatListRef?.current?.scrollToEnd({animated: false})
        }
        initialNumToRender={messages.length}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
      />
      <TextInputButton
        height={'70px'}
        content={content}
        onChangeText={onChangeText}
        onPress={sendChat}
      />
    </Wrapper>
  );
};

export default ChatMessageScreen;

const Wrapper = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: white;
`;
