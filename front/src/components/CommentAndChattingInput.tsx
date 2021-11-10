/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, Keyboard} from 'react-native';
import {postApi} from '../api/indexApi';
import styled from 'styled-components/native';
import MESSAGE_ICON from '../assets/images/MESSAGE_ICON.png';
import {useRecoilState} from 'recoil';
import {commentState} from '../states/MemberState';

interface Props {
  postId: number;
  apiFunc: Function;
}

const CommentAndChattingInput = ({postId, apiFunc}: Props) => {
  const [text, onChangeText] = useState('');
  const [comments, setComments] = useRecoilState(commentState);

  return (
    <InputView>
      <InputWraaper>
        <CommentInput
          multiline={true}
          numberOfLines={3}
          onChangeText={onChangeText}
          value={text}
        />
        <CommentInputButton
          onPress={async () => {
            try {
              const data = await apiFunc(postId, text);
              if (data.status === 200) {
                const posts = await postApi.getPostById(postId);
                setComments(posts.data.comments);
                onChangeText('');
                Keyboard.dismiss();
              }
            } catch (e) {
              console.error(e);
            }
          }}>
          <Image
            source={MESSAGE_ICON}
            style={{
              resizeMode: 'contain',
              width: 20,
              left: -1,
              top: 1,
            }}
          />
        </CommentInputButton>
      </InputWraaper>
    </InputView>
  );
};

export default CommentAndChattingInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: 70,
  },
});

const InputView = styled.View`
  background-color: #ffffff;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 70px;
  justify-content: center;
  align-items: center;
`;

const InputWraaper = styled.View`
  width: 96%;
  height: 50px;
  border-radius: 22px;
  background-color: #f0f0f0;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const CommentInput = styled.TextInput`
  width: 83%;
  height: 50px;
`;

const CommentInputButton = styled.TouchableOpacity`
  background-color: #c38753;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 2%;
  justify-content: center;
  align-items: center;
`;
