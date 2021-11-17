/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {
  StyleSheet,
  Dimensions,
  FlatList,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import HomePost from '../components/HomePost';
import HomeNotice from '../components/HomeNotice';
import HorizontalLine from '../components/HorizontalLine';
import {postApi} from '../api/indexApi';
import Geolocation from 'react-native-geolocation-service';
import {useRecoilState} from 'recoil';
import {postsState, hotPostsState} from '../states/MemberState';
import {useNavigation} from '@react-navigation/core';
import styled from 'styled-components/native';
import usePosition from '../util/usePosition';
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
        <HomePost
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
          keyExtractor={(item: any) => item.id}></FlatList>
      </View>
      <PostWriteButton
        onPress={() => {
          navigation.navigate('글쓰기', {});
        }}>
        <PostWriteText>글쓰기</PostWriteText>
      </PostWriteButton>
    </>
  );
};

const initialLayout = {width: Dimensions.get('window').width};

const HomeScreen = () => {
  const [position, excuteGetCoordinates] = usePosition();
  const [posts, setPosts] = useRecoilState(postsState);
  const [hotPosts, setHotPosts] = useRecoilState(hotPostsState);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'first',
      title: '최신 게시물',
    },
    {
      key: 'second',
      title: '핫 게시물',
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
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

const PostWriteButton = styled.TouchableOpacity`
  background-color: #c38753;
  position: absolute;
  left: 41%;
  bottom: 5px;
  width: 70px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 35px;
`;

const PostWriteText = styled.Text`
  color: #ffffff;
`;
