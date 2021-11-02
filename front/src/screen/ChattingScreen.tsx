/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import HorizontalLine from '../components/HorizontalLine';
import Chatting from '../components/Chatting';

const data = [
  {
    nickname: 'fumyparli',
    text: '안녕하세요~~~~~~~~!!!!!!!!!!',
    date: '1월 30일',
    km: '3.4',
    chattingNumber: '3',
  },
  {
    nickname: 'fumyparli',
    text: '뿌에에에에엥뿌에에에에엥뿌에에에에엥뿌에에에에엥뿌에에에에엥뿌에에에에엥뿌에에에에엥뿌에에에에엥뿌에에에에엥뿌에에에에엥',
    date: '1월 28일',
    km: '3',
    chattingNumber: '2',
  },
  {
    nickname: 'fumyparli',
    text: '나랑놀자~~~~~~~~~~~~~!@~@!@!@~~~~~!!!!!!!!!!!!!!!!!!!',
    date: '1월 27일',
    km: '2',
    chattingNumber: '1235',
  },
  {
    nickname: 'fumyparli',
    text: '채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅',
    date: '1월 26일',
    km: '3',
    chattingNumber: '9',
  },
  {
    nickname: 'fumyparli',
    text: 'ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ',
    date: '1월 25일',
    km: '7',
    chattingNumber: '5',
  },
  {
    nickname: 'fumyparli',
    text: '뭐해??~~~~~~~~!!!!!!!!!!',
    date: '1월 25일',
    km: '3',
  },
  {
    nickname: 'fumyparli',
    text: '안녕하십니까~~~~~~~~!!!!!!!!!!',
    date: '1월 25일',
    km: '9',
    chattingNumber: '9',
  },
  {
    nickname: 'fumyparli',
    text: '!!!!!!',
    date: '1월 23일',
    km: '0.1',
    chattingNumber: '1',
  },
  {
    nickname: 'fumyparli',
    text: 'LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem',
    date: '1월 22일',
    km: '10',
  },
  {
    nickname: 'fumyparli',
    text: '뭐해??~~~~~~~~!!!!!!!!!!',
    date: '1월 25일',
    km: '3',
    chattingNumber: '2',
  },
  {
    nickname: 'fumyparli',
    text: '안녕하십니까~~~~~~~~!!!!!!!!!!',
    date: '1월 25일',
    km: '9',
    chattingNumber: '2',
  },
  {
    nickname: 'fumyparli',
    text: '!!!!!!',
    date: '1월 23일',
    km: '0.1',
  },
  {
    nickname: 'fumyparli',
    text: 'LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem',
    date: '1월 22일',
    km: '10',
  },
  {
    nickname: 'fumyparli',
    text: 'LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem',
    date: '1월 22일',
    km: '10',
  },
];

const ChattingScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HorizontalLine />
      {data.map(item => (
        <Chatting
          nickname={item.nickname}
          text={item.text}
          date={item.date}
          km={item.km}
          chattingNumber={item.chattingNumber}></Chatting>
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
