/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import HorizontalLine from '../components/HorizontalLine';
import Chatting from '../components/Chatting';
import {useRecoilState, useRecoilValue} from 'recoil';
import {chatListState} from '../states/ChatState';

import {chatApi} from '../api/indexApi';
import {memberInfoState} from '../states/MemberState';
import {useFocusEffect, useNavigation} from '@react-navigation/core';

const ChattingScreen = () => {
  const navigation: any = useNavigation();
  const memberInfo = useRecoilValue(memberInfoState);
  const [chatList, setChatList] = useRecoilState(chatListState);
  const [lastMessageList, setLastMessageList]: any = useState([]);

  const getData = async () => {
    const {status, data}: any = await chatApi.findAllChatrooms();
    if (status === 200) {
      setChatList(data);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const getLastMessage = async (room_id: any) =>
        await chatApi.findLastChatMessage(room_id);

      const initChatLastMessage = async () => {
        const {data} = await chatApi.findAllChatrooms();
        setChatList(data);
        console.log('init Last Message');
        setLastMessageList(
          await Promise.all(
            data.map(async (chatroom: any, i: any) => {
              const {data: lastMessage} = await getLastMessage(
                chatroom.chatroom_id,
              );
              return lastMessage;
            }),
          ),
        );
      };

      initChatLastMessage();

      const polling = setInterval(initChatLastMessage, 25 * 1000);

      return () => clearInterval(polling);
    }, []),
  );

  useEffect(() => {
    getData();
  }, []);

  const onClick = (nickname: String, chatroom_id: String) =>
    navigation.navigate('ChatMessageScreen', {nickname, chatroom_id});

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HorizontalLine />
      {chatList &&
        lastMessageList.length > 0 &&
        chatList.map(({chatroom_id, member, opponent}: any, i: any) => (
          <Chatting
            key={chatroom_id}
            opponent={memberInfo.id === member.id ? opponent : member}
            chatroom_id={chatroom_id}
            date={lastMessageList[i].created_at}
            content={lastMessageList[i].content}
            km={'3'}
            onClick={(nickname: String, chatroom_id: String, opponent: any) => {
              navigation.navigate('ChatMessageScreen', {
                nickname,
                chatroom_id,
                opponent,
              });
            }}
          />
        ))}
    </ScrollView>
  );
};

export default ChattingScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flexGrow: 1,
  },
});
