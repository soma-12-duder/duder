/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
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
import {useRecoilState, useResetRecoilState} from 'recoil';
import {postState} from '../states/MemberState';

interface Props {
  getPostsApi: Function;
}

const ViewRoute = ({getPostsApi}: Props) => {
  const [posts, setPosts] = useRecoilState(postState);
  const [position, setPosition] = useState<any>(null);

  async function getCoor() {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if ('granted' === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            setPosition(position);
            console.log('position: ', position);
          },
          error => {
            console.error('error2:', error);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
      }
    }
  }

  async function getData() {
    try {
      const {data} = await getPostsApi(37.1, 127.1212, '1000');
      setPosts(data);
      console.log('postData2: ', data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getCoor();
  }, []);

  useEffect(() => {
    if (position) getData();
    else console.log('fucking');
  }, [position]);

  const renderItem = ({item}: any) => {
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
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}></FlatList>
      </View>
    </>
  );
};

const initialLayout = {width: Dimensions.get('window').width};

const HomeScreen = () => {
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
        first: () => <ViewRoute getPostsApi={postApi.getAllPosts} />,
        second: () => <ViewRoute getPostsApi={postApi.getAllPosts} />,
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
