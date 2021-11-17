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
import CAMERA_ICON from '../assets/images/CAMERA_ICON.png';
import HorizontalLine from '../components/HorizontalLine';
import usePosition from '../util/usePosition';
import {requestAuthorization} from 'react-native-geolocation-service';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RNS3} from 'react-native-aws3';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {assets} from '../../react-native.config';
import {SECRET} from '../../env';

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
  const [uris, setUris] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [isClickedPostRequset, setIsClickedPostRequset] = useState(false);

  async function enrollPostUsingUseEffect() {
    try {
      //   position.coords.latitude,
      //   position.coords.longitude,
      const data = await postApi.enrollPost(
        37.1,
        127.1212,
        uris,
        titleText,
        mainText,
      );
      if (data.status === 200) {
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
        setHotPosts(hotPostsData);
        navigation.pop();
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    const launch = async () => {
      await launchImageLibrary(
        {
          mediaType: 'photo',
          includeExtra: true,
          selectionLimit: 10,
        },
        async (res: any) => {
          if (res?.assets) {
            setPhotos(res.assets.map((photo: any) => photo.uri));

            const options = {
              keyPrefix: 'post/',
              bucket: 'soma12-s3',
              region: 'ap-northeast-2',
              accessKey: SECRET.accessKey,
              secretKey: SECRET.secretKey,
              successActionStatus: 201,
            };
            let photoUriId = 0;
            let photoUris: any = [];
            for await (const photo of res.assets) {
              const file = {
                uri: photo.uri,
                name: `${new Date()}${photoUriId++}.png`,
                type: 'image/png',
              };
              const res = await RNS3.put(file, options);
              photoUris.push(res.body.postResponse.location);
            }
            setUris(() => {
              setIsLoading(false);
              return photoUris;
            });
          }
        },
      );
    };
    if (isLoading) {
      launch();
    }
  }, [isLoading]);

  useEffect(() => {
    if (position && !isLoading && isClickedPostRequset) {
      enrollPostUsingUseEffect();
    }
  }, [position, isLoading, isClickedPostRequset]);

  useEffect(() => {
    excuteGetCoordinates();
  }, []);

  return (
    <>
      <ScrollView>
        <InputWraaper>
          <TitleWrittingInput
            multiline={true}
            onChangeText={setMainText}
            value={mainText}
            placeholder="게시글 내용을 작성해주세요."
            placeholderTextColor="#BBBBBB"
          />
        </InputWraaper>

        <HorizontalLine width={95} />
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: 30,
          }}
          onPress={() => setIsLoading(true)}>
          <CameraImage source={CAMERA_ICON} />
        </TouchableOpacity>
        <PhotoView>
          {photos ? (
            photos.map((photoUri: any) => (
              <Image
                source={{
                  uri: photoUri,
                }}
                style={{width: '48.78%', height: 100, marginBottom: 9}}
              />
            ))
          ) : (
            <></>
          )}
        </PhotoView>
      </ScrollView>
      <PostWirttingConfirmButton onPress={() => setIsClickedPostRequset(true)}>
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
  margin: 1px 16px 16px 16px;
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

const InputWraaper = styled.View`
  justify-content: flex-start;
  align-items: flex-start;
`;

const CameraImage = styled.Image`
  margin: 6px 16px 1px 9px;
  width: 30px;
  height: 30px;
`;

const PhotoView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 9px;
`;
