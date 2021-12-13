/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useCallback} from 'react';
import {Dimensions, FlatList} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import HomePost from '../components/HomePost';
import {postApi} from '../api/indexApi';
import {useRecoilState} from 'recoil';
import {
  postsState,
  hotPostsState,
  isRefreshingState,
} from '../states/MemberState';
import {useNavigation} from '@react-navigation/core';
import styled from 'styled-components/native';
import usePosition from '../util/usePosition';
import POST_WRITING_LOGO from '../assets/images/POST_WRITING_LOGO.png';

interface Props {
  posts: any;
  position: any;
  apiFunc: any;
}

const ViewRoute = ({posts, position, apiFunc}: Props) => {
  const navigation: any = useNavigation();
  const [isRefreshing, setIsRefreshing] = useRecoilState(isRefreshingState);

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
      <Wrapper>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
          onRefresh={() => {
            apiFunc();
          }}
          refreshing={isRefreshing}></FlatList>
      </Wrapper>
      <PostWriteButton
        onPress={() => {
          navigation.navigate('글쓰기', {});
        }}>
        <PostWritingImage source={POST_WRITING_LOGO} />
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
  const [isRefreshing, setIsRefreshing] = useRecoilState(isRefreshingState);

  async function getData() {
    setIsRefreshing(true);
    try {
      const {data} = await postApi.getAllPosts(37.1, 127.1212, '1000');
      const {data: data2} = await postApi.getAllHotPosts(
        37.1,
        127.1212,
        '1000',
      );
      setPosts(data);
      setHotPosts(data2);
      setIsRefreshing(false);
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
        first: () => (
          <ViewRoute posts={posts} position={position} apiFunc={getData} />
        ),
        second: () => (
          <ViewRoute posts={hotPosts} position={position} apiFunc={getData} />
        ),
      })}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

export default HomeScreen;

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const PostWriteButton = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #c38753;
  position: absolute;
  left: 41%;
  bottom: 5px;
  width: 90px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 35px;
`;

const PostWritingImage = styled.Image`
  width: 25px;
  height: 20px;
`;

const PostWriteText = styled.Text`
  color: #ffffff;
`;
