/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import ViewMainText from '../components/ViewMainText';
import ViewCommentText from '../components/ViewCommentText';
import CommentAndChattingInput from '../components/CommentAndChattingInput';
import {ScrollView, StyleSheet, Keyboard} from 'react-native';
import {useRecoilState} from 'recoil';
import {postState} from '../states/MemberState';
import {postApi} from '../api/indexApi';
import styled from 'styled-components/native';

interface Props {
  route: any;
  navigation: any;
}

const PostScreen = ({route, navigation}: Props) => {
  const [post, setPost]: any = useRecoilState(postState);
  const commentInputRef: any = React.useRef(null);

  async function getData() {
    try {
      const {data} = await postApi.getPostById(route.params.id);
      setPost(data);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps={true}>
        <ViewMainText
          id={route.params.id}
          distance={route.params.distance}
          photo_urls={post.photo_urls}
          member={post.member}
          isProfile={route.params.isProfile}
        />
        {post?.comments?.map((item: any, index: any) => {
          return (
            <>
              <ViewCommentText
                key={index}
                commentOfComment={false}
                content={item.comment.content}
                member={item.comment.member}
                favorite_count={item.favorite_count}
                commentInputRef={commentInputRef}
                comment_id={item.comment.id}
              />
              {item.sub_comments.map((item2: any, index: any) => (
                <ViewCommentText
                  key={index}
                  commentOfComment={true}
                  content={item2.content}
                  member={item2.member}
                  favorite_count={'7'}
                  commentInputRef={commentInputRef}
                />
              ))}
            </>
          );
        })}
      </ScrollView>

      <CommentAndChattingInput
        postId={route.params.id}
        apiFunc={postApi.postComment}
        apiFunc2={postApi.postCommentOfComment}
        ref={commentInputRef}
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
