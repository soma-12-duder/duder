/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {StyleSheet, Dimensions, ScrollView} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import HomePost from './HomePost';
import HomeNotice from './HomeNotice';

const LatestViewRoute = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HomeNotice text="듀더 이벤트! 추첨을 통해 10명에게 에어팟!??" />
      <HomePost km="1.4" text="상수역 맛집 추천좀요" />
      <HomePost km="0.5" text="합정역 주변 같이 노실분 구해요 ~~~~~~~~~" />
      <HomePost
        km="0.1"
        text="공덕 이사왔는데 청솔아파트 주변 담배 어디서 핌?? 필 곳이 없네요"
      />
      <HomePost
        km="4.0"
        text="이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이!!!!"
      />
      <HomePost
        km="9.7"
        text="뿌륵 뿌륵! 뿌륵 뿌륵!뿌륵 뿌륵! 뿌륵 뿌륵!뿌륵 뿌륵! 뿌륵 뿌륵!뿌륵 뿌륵! 뿌륵 뿌륵!뿌륵 뿌륵!뿌륵 뿌륵!뿌륵 뿌륵!뿌륵 뿌륵!뿌륵 뿌륵!뿌륵 뿌륵!뿌륵 뿌륵!뿌륵 뿌륵!뿌륵 뿌륵!뿌륵 뿌륵!뿌륵 뿌륵! 뿌륵 뿌륵!뿌륵 뿌륵! 뿌륵 뿌륵!뿌륵 뿌륵! 뿌륵 뿌륵!뿌륵 뿌륵! 뿌륵 뿌륵!뿌륵 뿌륵! 뿌륵 뿌륵!뿌륵 뿌륵! 뿌륵 뿌륵!"
      />
    </ScrollView>
  );
};

const HotViewRoute = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HomeNotice text="듀더 이벤트! 추첨을 통해 10명에게 에어팟!??" />
      <HomePost km="1.4" text="상수역 맛집 추천좀요" />
      <HomePost km="0.5" text="합정역 주변 같이 노실분 구해요 ~~~~~~~~~" />
      <HomePost
        km="0.1"
        text="공덕 이사왔는데 청솔아파트 주변 담배 어디서 핌?? 필 곳이 없네요s"
      />
    </ScrollView>
  );
};
const initialLayout = {width: Dimensions.get('window').width};

const LatestOrHotTabView = () => {
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
        style={{backgroundColor: '#fff3d1'}}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor: 'blue',
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
            activeColor="red"
            inactiveColor="pink"
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

export default LatestOrHotTabView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
