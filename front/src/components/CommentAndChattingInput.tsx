/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, Image, Keyboard} from 'react-native';
import {postApi} from '../api/indexApi';
import styled from 'styled-components/native';
import MESSAGE_ICON from '../assets/images/MESSAGE_ICON.png';
import {useRecoilState} from 'recoil';
import {postState, commentState} from '../states/MemberState';

const CommentAndChattingInput = React.forwardRef(
  ({postId, apiFunc, apiFunc2, apiFunc3}: any, commentInputRef: any) => {
    const [text, onChangeText] = useState('');
    const [post, setPost] = useRecoilState(postState);
    const [commentForRecoil, setCommentForRecoil]: any =
      useRecoilState(commentState);

    return (
      <InputView>
        <InputWraaper>
          <CommentInput
            multiline={true}
            numberOfLines={3}
            onChangeText={onChangeText}
            value={text}
            ref={commentInputRef}
          />
          <CommentInputButton
            onPress={async () => {
              try {
                let data;
                if (commentForRecoil.isClickCommentInput) {
                  data = await apiFunc2(
                    postId,
                    text,
                    commentForRecoil.comment_id,
                  );
                } else {
                  data = await apiFunc(postId, text);
                }
                if (data.status === 200) {
                  const posts = await postApi.getPostById(postId);
                  setPost(posts.data);
                  setCommentForRecoil({
                    isClickCommentInput: false,
                  });
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
  },
);

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
