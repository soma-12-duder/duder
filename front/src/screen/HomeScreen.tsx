/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {StyleSheet, Dimensions, ScrollView} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import HomePost from '../components/HomePost';
import HomeNotice from '../components/HomeNotice';
import HorizontalLine from '../components/HorizontalLine';

const data = [
  {
    km: '1.4',
    text: '상수역 맛집 추천좀요',
    nickname: 'fumyparli',
    like: '15',
    commentNumber: '11',
  },
  {
    km: '1.5',
    text: '으아!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
    nickname: 'fumyparli',
    like: '3',
    commentNumber: '1',
  },
  {
    km: '1.4',
    text: '합정역 주변 같이 노실분 구해요 ~~~~~~~~~',
    nickname: 'fumyparli',
    like: '0',
    commentNumber: '0',
  },
  {
    km: '1.4',
    text: '우주 최강 승범! 우주 최강 승범! 우주 최강 승범! 우주 최강 승범! 우주 최강 승범! 우주 최강 승범! 우주 최강 승범!',
    nickname: 'fumyparli',
    like: '155004',
    commentNumber: '995724',
  },
  {
    km: '1.4',
    text: '공덕 이사왔는데 청솔아파트 주변 담배 어디서 핌?? 필 곳이 없네요',
    nickname: 'fumyparli',
    like: '15',
    commentNumber: '11',
  },
  {
    km: '1.4',
    text: '뿌륵 뿌륵! 뿌륵 뿌륵!뿌륵 뿌륵! 뿌륵 뿌륵!뿌륵 뿌륵! 뿌륵 뿌륵!뿌륵 뿌륵! 뿌륵 뿌륵!뿌륵 뿌륵!뿌륵 뿌륵!뿌륵 뿌륵!뿌륵 뿌륵!뿌륵 뿌륵!뿌륵 뿌륵!뿌륵 뿌륵!뿌륵 뿌륵!뿌륵 뿌륵!뿌륵 뿌륵!뿌륵 뿌륵! 뿌륵 뿌륵!',
    nickname: 'fumyparli',
    like: '15',
    commentNumber: '11',
  },
  {
    km: '1.4',
    text: '이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이!!!',
    nickname: 'fumyparli',
    like: '15',
    commentNumber: '11',
  },
];

const LatestViewRoute = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HomeNotice text="듀더 이벤트! 추첨을 통해 10명에게 에어팟!??" />
      <HorizontalLine />
      {data.map(item => (
        <HomePost
          km={item.km}
          text={item.text}
          nickname={item.nickname}
          like={item.like}
          commentNumber={item.commentNumber}
        />
      ))}
    </ScrollView>
  );
};

const HotViewRoute = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HomeNotice text="듀더 이벤트! 추첨을 통해 10명에게 에어팟!??" />
      {data.map(item => (
        <>
          <HomePost
            km={item.km}
            text={item.text}
            nickname={item.nickname}
            like={item.like}
            commentNumber={item.commentNumber}
          />
        </>
      ))}
    </ScrollView>
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
    <>
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
          first: () => <LatestViewRoute />,
          second: () => <HotViewRoute />,
        })}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },
});
