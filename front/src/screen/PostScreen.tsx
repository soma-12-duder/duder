/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import ViewMainText from '../components/ViewMainText';
import ViewCommentText from '../components/ViewCommentText';
import {ScrollView, StyleSheet} from 'react-native';

interface Props {
  route: any;
  navigation: any;
}

const data = [
  {
    commentOfComment: false,
    comment:
      '댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글',
    like: '7',
    nickname: 'kingjinoh',
  },
  {
    commentOfComment: true,
    comment:
      '댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글',
    like: '7',
    nickname: 'kingjinoh',
  },
  {
    comment:
      '댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글',
    like: '7',
    nickname: 'kingjinoh',
  },
  {
    commentOfComment: true,
    comment:
      '댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글',
    like: '7',
    nickname: 'kingjinoh',
  },
  {
    commentOfComment: true,
    comment:
      '댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글',
    like: '7',
    nickname: 'kingjinoh',
  },
  {
    commentOfComment: false,
    comment:
      '댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글',
    like: '7124324',
    nickname: 'kingjinoh',
  },
  {
    commentOfComment: true,
    comment:
      '댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글',
    like: '253467',
    nickname: 'kingjinoh',
  },
];

const PostScreen = ({route, navigation}: Props) => {
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <ViewMainText text={route.params.text} />
        {data.map(item => (
          <ViewCommentText
            commentOfComment={item.commentOfComment}
            comment={item.comment}
            like={item.like}
            nickname={item.nickname}></ViewCommentText>
        ))}
      </ScrollView>
    </>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },
});
