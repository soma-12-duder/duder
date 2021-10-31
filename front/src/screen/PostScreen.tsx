/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import ViewMainText from '../components/ViewMainText';
import ViewCommentText from '../components/ViewCommentText';

interface Props {
  route: any;
  navigation: any;
}

const PostScreen = ({route, navigation}: Props) => {
  return (
    <>
      <ViewMainText text={route.params.text} />
      <ViewCommentText
        commentOfComment={false}
        comment="댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글"
      />
      <ViewCommentText
        commentOfComment={true}
        comment="대댓글 대댓글 대댓글 대댓글 대댓글 대댓글 대댓글 대댓글 대댓글 대댓글 대댓글 대댓글 대댓글 대댓글"
      />
    </>
  );
};

export default PostScreen;
