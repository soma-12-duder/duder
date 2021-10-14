/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

interface Props {
  mainText: String;
}

const ViewMainTextOfOthersPost = ({mainText}: Props) => {
  const [clicked, setClicked] = React.useState(false);
  const clickHeart = () => setClicked(!clicked);

  return (
    <>
      <View style={{width: 375, top: -37}}>
        <ProfileWrapper>
          <UserProfileImage
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5ebn2o15gmobO1xOj1ESvldLkPBxnC4ZwDg&usqp=CAU',
            }}
          />
          <Text style={{left: 7, top: 1, fontSize: 20}}>fumyparli</Text>
          <Text style={{left: 13, top: 1, fontWeight: 'bold', fontSize: 20}}>
            3km
          </Text>
        </ProfileWrapper>
        <IconWrapper style={{top: -27}}>
          <TouchableOpacity onPress={() => clickHeart()}>
            {clicked ? (
              <Ionicons name="heart" size={30} style={{left: 10}} />
            ) : (
              <Ionicons name="ios-heart-outline" size={30} style={{left: 10}} />
            )}
          </TouchableOpacity>
        </IconWrapper>
        <Text style={{top: -4, left: 10, fontSize: 15}}>{mainText}</Text>
        <IconWrapperMini style={{left: 14, top: 0}}>
          <Ionicons name="heart" style={{left: -11}} />
          <Text style={{top: -4, left: -10}}>6</Text>
          <Ionicons name="md-chatbubble-ellipses-outline" />
          <Text style={{top: -4}}>15</Text>
        </IconWrapperMini>
      </View>
    </>
  );
};

export default ViewMainTextOfOthersPost;

const UserProfileImage = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 100px;
`;

const ProfileWrapper = styled(View)`
  flex-direction: row;
  justify-content: flex-start;
  margin: 10px;
  top: 30px;
`;

const IconWrapper = styled(View)`
  flex-direction: row;
  justify-content: flex-end;
  padding: 5px;
`;

const IconWrapperMini = styled(View)`
  flex-direction: row;
  justify-content: flex-start;
  padding: 5px;
`;
