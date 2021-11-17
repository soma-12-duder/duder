/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {
  StyleSheet,
  Dimensions,
  FlatList,
  View,
  PermissionsAndroid,
  Platform,
  Image,
  Text,
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import ProfilePost from '../components/ProfilePost';
import HomeNotice from '../components/HomeNotice';
import HorizontalLine from '../components/HorizontalLine';
import {postApi} from '../api/indexApi';
import Geolocation from 'react-native-geolocation-service';
import {useRecoilState} from 'recoil';
import {postsState, hotPostsState} from '../states/MemberState';
import {useNavigation} from '@react-navigation/core';
import styled from 'styled-components/native';
import usePosition from '../util/usePosition';
import PENCIL_ICON from '../assets/images/PENCIL_ICON.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import Icons from 'react-native-vector-icons/Ionicons';

interface Props {
  posts: any;
  position: any;
}

const ViewRoute = ({posts, position}: Props) => {
  const navigation: any = useNavigation();

  const renderItem = useCallback(
    ({item}: any) => {
      return (
        <ProfilePost
          id={item.id}
          distance={item.distance}
          content={item.content}
          member={item.member}
          favorite_count={item.favorite_count}
          comment_count={item.comment_count}
        />
      );
    },
    [posts],
  );

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
          initialNumToRender={7}></FlatList>
      </View>
    </>
  );
};

const initialLayout = {width: Dimensions.get('window').width};

const ProfileScreen = () => {
  const [position, excuteGetCoordinates] = usePosition();
  const [posts, setPosts] = useRecoilState(postsState);
  const [hotPosts, setHotPosts] = useRecoilState(hotPostsState);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'first',
      title: '내가 쓴 글',
    },
    {
      key: 'second',
      title: '좋아요한 글',
    },
  ]);

  async function getData() {
    try {
      const {data} = await postApi.getAllPosts(37.1, 127.1212, '1000');
      const {data: data2} = await postApi.getAllHotPosts(
        37.1,
        127.1212,
        '1000',
      );
      setPosts(data);
      setHotPosts(data2);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getData();
  }, [position]);

  useEffect(() => {
    excuteGetCoordinates();
  }, []);

  return (
    <>
      <HorizontalLine />
      <ProfilePictureAndNickName>
        <ProfileImage
          source={{
            uri: 'https://soma12-s3.s3.ap-northeast-2.amazonaws.com/profile/testbeen.png',
          }}
        />
        <TouchableOpacity>
          <NicknameAndIcon>
            <Text>승패</Text>
            <Image
              source={PENCIL_ICON}
              style={{width: 13, height: 13, top: 1, marginLeft: 3}}
            />
          </NicknameAndIcon>
        </TouchableOpacity>
      </ProfilePictureAndNickName>
      <TabView
        style={{backgroundColor: '#ffffff'}}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor: '#0A0A0A',
            }}
            style={{
              backgroundColor: 'white',
              elevation: 0,
            }}
            labelStyle={{
              alignItems: 'center',
              fontSize: 14,
              includeFontPadding: false,
            }}
            activeColor="#000000"
            inactiveColor="#BBBBBB"
          />
        )}
        navigationState={{index, routes}}
        renderScene={SceneMap({
          first: () => <ViewRoute posts={posts} position={position} />,
          second: () => <ViewRoute posts={hotPosts} position={position} />,
        })}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

const ProfilePictureAndNickName = styled.View`
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  padding: 60px 30px 50px 30px;
`;

const NicknameAndIcon = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfileImage = styled.Image`
  width: 80;
  height: 80;
  border-radius: 40;
`;
