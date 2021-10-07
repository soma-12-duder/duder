import * as React from 'react';
import {View, Dimensions} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import HomePost from './HomePost';

const FirstRoute = () => {
  return (
    <View>
      <HomePost />
      <HomePost />
      <HomePost />
      <HomePost />
      <HomePost />
    </View>
  );
};

const SecondRoute = () => {
  return <View />;
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
          first: () => <FirstRoute />,
          second: () => <SecondRoute />,
        })}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </>
  );
};

export default LatestOrHotTabView;
