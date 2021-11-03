/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import HorizontalLine from '../components/HorizontalLine';
import {Colors} from '../util/Constants';

interface Props {
  comment: String;
  nickname: String;
  like: String;
  commentOfComment?: boolean;
}

const ViewCommentText = ({
  comment,
  commentOfComment,
  nickname,
  like,
}: Props) => {
  return (
    <CommentView commentOfComment={commentOfComment}>
      <ProfileWrapper>
        <UserProfileImage
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5ebn2o15gmobO1xOj1ESvldLkPBxnC4ZwDg&usqp=CAU',
          }}
        />
        <Text style={{fontSize: 16, paddingLeft: '1.5%'}}>{nickname}</Text>
      </ProfileWrapper>
      <Text style={{paddingLeft: '4%'}}>{comment}</Text>
      <GrayTextWrapper>
        <TouchableOpacity>
          <GrayText>좋아요</GrayText>
        </TouchableOpacity>
        <GrayText style={{paddingLeft: '1%'}}>{like}</GrayText>
        <TouchableOpacity style={{paddingLeft: '3%'}}>
          {commentOfComment ? <></> : <GrayText>답글쓰기</GrayText>}
        </TouchableOpacity>
      </GrayTextWrapper>
    </CommentView>
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
  padding-left: ${(props: any) => (props.commentOfComment ? '4%' : '0')};
`;
