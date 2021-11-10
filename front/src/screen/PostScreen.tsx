/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import ViewMainText from '../components/ViewMainText';
import ViewCommentText from '../components/ViewCommentText';
import CommentAndChattingInput from '../components/CommentAndChattingInput';
import {ScrollView, StyleSheet, Image, FlatList, View} from 'react-native';
import {useRecoilState} from 'recoil';
import {commentState} from '../states/MemberState';
import {postApi} from '../api/indexApi';
import styled from 'styled-components/native';
import MESSAGE_ICON from '../assets/images/MESSAGE_ICON.png';

interface Props {
  route: any;
  navigation: any;
}

const PostScreen = ({route, navigation}: Props) => {
  const [comments, setComments]: any = useRecoilState(commentState);
  async function getData() {
    try {
      const {data} = await postApi.getPostById(route.params.id);
      setComments(data.comments);
      console.log('data comment: ', data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <ViewMainText
          id={route.params.id}
          content={route.params.content}
          member={route.params.member}
          distance={route.params.distance}
          favorite_count={route.params.favorite_count}
          comment_count={route.params.comment_count}
        />
        {comments.map((item: any, index: any) => {
          return (
            <>
              <ViewCommentText
                key={index + 'comment'}
                commentOfComment={false}
                content={item.comment.content}
                member={item.comment.member}
                favorite_count={item.favorite_count}
              />
              {item.sub_comments.map((item2: any, index: any) => (
                <ViewCommentText
                  key={index}
                  commentOfComment={true}
                  content={item2.content}
                  member={item2.member}
                  favorite_count={'7'}
                />
              ))}
            </>
          );
        })}
      </ScrollView>

      <CommentAndChattingInput
        postId={route.params.id}
        apiFunc={postApi.postComment}
      />
    </>
  );
};

export default PostScreen;

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
