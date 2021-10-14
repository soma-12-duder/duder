/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import HorizontalLine from '../components/HorizontalLine';
import {Colors} from '../util/Constants';

interface Props {
  comment: String;
  commentOfComment: boolean;
}

const ViewCommentText = ({comment, commentOfComment}: Props) => {
  const [clicked, setClicked] = React.useState(false);
  const clickHeart = () => setClicked(!clicked);

  const commentInterval = commentOfComment ? 20 : 0;
  const backgroundColor = commentOfComment
    ? 'gray'
    : Colors.POST_BACKGROUND_COLOR;

  return (
    <>
      <HorizontalLine />
      <View
        style={{
          width: 375 - commentInterval,
          top: -75,
          left: commentInterval,
          backgroundColor: backgroundColor,
        }}>
        <ProfileWrapper>
          <UserProfileImage
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5ebn2o15gmobO1xOj1ESvldLkPBxnC4ZwDg&usqp=CAU',
            }}
          />
          <Text style={{left: 7, top: 1, fontSize: 12}}>fumyparli</Text>
          <Text style={{left: 13, top: 1, fontWeight: 'bold', fontSize: 12}}>
            3km
          </Text>
        </ProfileWrapper>
        <TextAndCommentWrapper>
          <Text style={{top: -4, left: 10, fontSize: 15}}>{comment}</Text>
          <IconWrapperMini style={{left: 14, top: 0}}>
            <TouchableOpacity onPress={() => clickHeart()}>
              {clicked ? (
                <Ionicons name="heart" size={20} style={{left: -11}} />
              ) : (
                <Ionicons
                  name="ios-heart-outline"
                  size={20}
                  style={{left: -11}}
                />
              )}
            </TouchableOpacity>

            <Text style={{top: -1, left: -10, fontSize: 16}}>2</Text>
            <Ionicons
              name="md-chatbubble-ellipses-outline"
              size={19}
              style={{left: -3}}
            />
            <Text style={{top: -1, left: -1, fontSize: 16}}>3</Text>
          </IconWrapperMini>
        </TextAndCommentWrapper>
      </View>
    </>
  );
};

export default ViewCommentText;

const UserProfileImage = styled(Image)`
  width: 20px;
  height: 20px;
  border-radius: 100px;
`;

const ProfileWrapper = styled(View)`
  flex-direction: row;
  justify-content: flex-start;
  margin: 10px;
  top: 30px;
`;

const TextAndCommentWrapper = styled(View)`
  top: 30px;
`;

const IconWrapperMini = styled(View)`
  flex-direction: row;
  justify-content: flex-start;
  padding: 5px;
`;
