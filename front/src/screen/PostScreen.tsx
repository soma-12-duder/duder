/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import ViewMainText from '../components/ViewMainText';
import ViewCommentText from '../components/ViewCommentText';

const PostScreen = () => {
  return (
    <>
      <ViewMainText
        mainText="혜자구 hw1 인풋에 괄호가 포함되면 에러가 나는거 같은데.. 왜인진
          도저히 모르겠다 ㅜㅜ 적당한 에타글을 가져왔어요 혜자구 hw1 인풋에
          괄호가 포함되면 에러가 나는거 같은데.. 왜인진 도저히 모르겠다 ㅜㅜ
          적당한 에타글을 가져왔어요 혜자구 hw1 인풋에 괄호가 포함되면 에러가
          나는거 같은데.. 왜인진 도저히 모르겠다 ㅜㅜ 적당한 에타글을 가져왔어요
          혜자구 hw1 인풋에 괄호가 포함되면 에러가 나는거 같은데.. 왜인진 도저히
          모르겠다 ㅜㅜ"
      />
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
