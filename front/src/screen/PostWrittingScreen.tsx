/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import ViewMainText from '../components/ViewMainText';
import ViewCommentText from '../components/ViewCommentText';
import CommentAndChattingInput from '../components/CommentAndChattingInput';
import {
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
  View,
  TextInput,
  Text,
  Keyboard,
} from 'react-native';
import {useRecoilState} from 'recoil';
import {postsState, hotPostsState} from '../states/MemberState';
import {postApi} from '../api/indexApi';
import styled from 'styled-components/native';
import MESSAGE_ICON from '../assets/images/MESSAGE_ICON.png';
import HorizontalLine from '../components/HorizontalLine';
import usePosition from '../util/usePosition';
import {requestAuthorization} from 'react-native-geolocation-service';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RNS3} from 'react-native-aws3';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

interface Props {
  route: any;
  navigation: any;
}

const PostWrittingScreen = ({route, navigation}: Props) => {
  const [titleText, setTitleText] = useState('');
  const [mainText, setMainText] = useState('');
  const [position, excuteGetCoordinates] = usePosition();

  const [posts, setPosts] = useRecoilState(postsState);
  const [hotPosts, setHotPosts] = useRecoilState(hotPostsState);
  const [photos, setPhotos] = useState<any>();

  async function enrollPostUsingUseEffect() {
    try {
      //   position.coords.latitude,
      //   position.coords.longitude,
      const data = await postApi.enrollPost(
        37.1,
        127.1212,
        [],
        titleText,
        mainText,
      );
      if (data.status === 200) {
        console.log(data);
        setTitleText('');
        setMainText('');
        Keyboard.dismiss();
        const {data: postsData} = await postApi.getAllPosts(
          37.1,
          127.1212,
          '1000',
        );
        const {data: hotPostsData} = await postApi.getAllHotPosts(
          37.1,
          127.1212,
          '1000',
        );
        setPosts(postsData);
        setPosts(hotPostsData);
        navigation.pop();
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (!position) return;
    enrollPostUsingUseEffect();
  }, [position]);

  useEffect(() => {
    console.log('photos:', photos);
  }, [photos]);

  return (
    <>
      <ScrollView>
        <TitleWrittingInput
          multiline={true}
          onChangeText={setTitleText}
          value={titleText}
          placeholder="제목"
          placeholderTextColor="#BBBBBB"
        />
        <HorizontalLine width={90} />
        <TitleWrittingInput
          multiline={true}
          onChangeText={setMainText}
          value={mainText}
          placeholder="게시글 내용을 작성해주세요."
          placeholderTextColor="#BBBBBB"
        />
        <HorizontalLine width={90} />
        <View
          style={{
            backgroundColor: '#ffffff',
            height: 300,
            margin: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#000000',
              justifyContent: 'center',
              alignItems: 'center',
              width: 100,
              height: 100,
            }}
            onPress={async () => {
              // const file;
              await launchImageLibrary(
                {
                  mediaType: 'photo',
                  includeExtra: true,
                  selectionLimit: 10,
                },
                (res: any) => {
                  // console.log('res uri:', res.assets[0].uri);
                  setPhotos(res.assets.map((photo: any) => photo.uri));
                  // console.log('awefawefawefwefwaefewafweaf');
                },
              );
              // const response = await RNS3.put(file, options);
            }}>
            <Text style={{color: '#ffffff'}}>테스트 버튼</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: '#befbbb',
            height: 150,
            flexDirection: 'row',
          }}>
          {photos ? (
            photos.map((photoUri: any) => (
              <Image
                source={{
                  uri: photoUri,
                }}
                style={{width: 100, height: 100}}
              />
            ))
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
      <PostWirttingConfirmButton
        onPress={async () => {
          try {
            excuteGetCoordinates();
            console.log('position1312312312:', position);
          } catch (e) {
            console.error(e);
          }
        }}>
        <PostWrittingText>등록하기</PostWrittingText>
      </PostWirttingConfirmButton>
    </>
  );
};

export default PostWrittingScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flexGrow: 1,
  },
});

const PostWrttingView = styled.View`
  background-color: #ffffff;
`;

const TitleWrittingInput = styled.TextInput`
  margin: 1px 16px 1px 16px;
`;

const PostWirttingConfirmButton = styled.TouchableOpacity`
  background-color: #c38753;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 55px;
  justify-content: center;
  align-items: center;
`;

const PostWrittingText = styled.Text`
  color: #ffffff;
`;
