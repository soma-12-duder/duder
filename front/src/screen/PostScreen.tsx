/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useLayoutEffect} from 'react';
import ViewMainText from '../components/ViewMainText';
import ViewCommentText from '../components/ViewCommentText';
import CommentAndChattingInput from '../components/CommentAndChattingInput';
import {ScrollView, StyleSheet} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {memberInfoState, postState} from '../states/MemberState';
import {postApi} from '../api/indexApi';
import styled from 'styled-components/native';
import {BROWN, NK700} from '../util/Color';
import UtilButton from '../util/UtilButton';

interface Props {
  route: any;
  navigation: any;
}

const PostScreen = ({route, navigation}: Props) => {
  const [post, setPost]: any = useRecoilState(postState);
  const myInfo = useRecoilValue(memberInfoState);
  const commentInputRef: any = React.useRef(null);
  const {member: postMember, id: postId} = route.params;

  const onPressDeleteButton = async () => {
    const {data} = await postApi.deletePost(postId);
    console.log('delete data!!!!!!!!!', data);
    navigation.pop();
  };

  const getData = async () => {
    try {
      const {data} = await postApi.getPostById(route.params.id);
      setPost(data);
    } catch (e) {
      console.error(e);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (postMember.id === myInfo.id) {
          return (
            <RightButtonBox>
              <UtilButton
                width="40px"
                content="수정"
                family={NK700}
                onPress={() => console.log('click')}
                color={BROWN}
              />
              <UtilButton
                width="40px"
                content="삭제"
                family={NK700}
                onPress={onPressDeleteButton}
                color={BROWN}
              />
            </RightButtonBox>
          );
        }
      },
    });
  }, [navigation]);

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

const RightButtonBox = styled.TouchableOpacity`
  flex-direction: row;
  width: 100px;
  height: 40px;
  justify-content: center;
`;
