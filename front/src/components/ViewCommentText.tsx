/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import HorizontalLine from '../components/HorizontalLine';
import {useRecoilState} from 'recoil';
import {commentState} from '../states/MemberState';
import DUDER_IMAGE from '../assets/images/DUDER_IMAGE.png';

interface Props {
  content: String;
  commentOfComment?: boolean;
  member: any;
  favorite_count: String;
  commentInputRef: any;
  comment_id?: any;
}

const ViewCommentText = ({
  content,
  commentOfComment,
  member,
  favorite_count,
  commentInputRef,
  comment_id,
}: Props) => {
  const [commentForRecoil, setCommentForRecoil]: any =
    useRecoilState(commentState);

  return (
    <>
      <CommentView commentOfComment={commentOfComment}>
        <ProfileWrapper>
          {member.profile ? (
            <UserProfileImage
              source={{
                uri: `${member.profile}`,
              }}
            />
          ) : (
            <UserProfileImage source={DUDER_IMAGE} resizeMode="contain" />
          )}
          <Text style={{fontSize: 16, paddingLeft: '1.5%'}}>
            {member.nickname}
          </Text>
        </ProfileWrapper>
        <Text style={{paddingLeft: '4%'}}>{content}</Text>
        <GrayTextWrapper>
          <TouchableOpacity>
            <GrayText>좋아요</GrayText>
          </TouchableOpacity>
          {/* <GrayText style={{paddingLeft: '1%'}}>{favorite_count}</GrayText> */}
          {commentOfComment ? (
            <></>
          ) : (
            <TouchableOpacity
              style={{paddingLeft: '3%'}}
              onPress={() => {
                setCommentForRecoil({
                  isClickCommentInput: true,
                  comment_id: comment_id,
                });

                commentInputRef.current.focus();
              }}>
              {<GrayText>답글쓰기</GrayText>}
            </TouchableOpacity>
          )}
        </GrayTextWrapper>
      </CommentView>
      <HorizontalLine />
    </>
  );
};

export default ViewCommentText;

const ProfileWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  padding-left: 4%;
  padding-bottom: 2%;
`;

const UserProfileImage = styled(Image)`
  width: 25px;
  height: 25px;
  border-radius: 100px;
`;

const GrayText = styled(Text)`
  color: #a9a9a9;
`;

const GrayTextWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  padding-left: 4%;
  padding-top: 2%;
`;

const CommentView = styled(View)<{commentOfComment: any}>`
  background-color: ${(props: any) =>
    props.commentOfComment ? '#F0F0F0' : '#FFFFFF'};
  padding: 4%;
  padding-left: ${(props: any) => (props.commentOfComment ? '6%' : '0')};
  width: 100%;
`;
