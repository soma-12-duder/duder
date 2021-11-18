import React, {useState} from 'react';
import styled from 'styled-components/native';
import {WebView} from 'react-native-webview';
import {useRecoilState} from 'recoil';
import {memberInfoState} from '../states/MemberState';
import {useNavigation} from '@react-navigation/core';

import LoginButton from '../components/LoginButton';
import DivideLine from '../util/DivideLine';
import DuderImage from '../util/DuderImage';
import DuderName from '../components/DuderName';
import KAKAO_ICON from '../assets/images/KAKAO_ICON.png';
import UtilText from '../util/UtilText';
import {authApi} from '../api/indexApi';
import GOOGLE_ICON from '../assets/images/GOOGLE_ICON.png';

const LoginScreen = () => {
  const [isToggle, setIsToggle] = useState(true);
  const [, setMember] = useRecoilState(memberInfoState);
  const navigation = useNavigation();

  const loginApi = async (event: any) => {
    try {
      const {access_token, email, existed_member} = JSON.parse(event);
      const {data}: any = await authApi.getUserInfo(access_token);
      console.log(
        '로그인시 멤버데이터:',
        data,
        'exsited_member:',
        existed_member,
        'json.parse.event',
        JSON.parse(event),
      );
      setMember(data);
      if (existed_member) {
        navigation.navigate('BottomTab' as never);
      } else {
        navigation.navigate('NicknameScreen' as never);
      }
    } catch (error) {
      console.error(error);
    }

    return;
  };
  const INJECTED_JAVASCRIPT = ` (function() {
    document.getElementsByTagName('pre')[0].style.display="none";
    window.ReactNativeWebView.postMessage(document.getElementsByTagName('pre')[0].innerHTML);
    })();
    true;`; // note: this is required, or you'll sometimes get silent failures

  return (
    <Wrapper>
      {isToggle ? (
        <>
          <DuderImageContainer>
            <DuderImage />
            <DivideLine height={16} />
            <DuderName />
            <DivideLine height={16} />
            <UtilText content={'우리 지역의 SNS'} />
          </DuderImageContainer>
          <ButtonContainer>
            <LoginButton
              onPress={() => setIsToggle(!isToggle)}
              name={'카카오로 시작'}
              image={KAKAO_ICON}
              kind="Kakao"
            />
            <LoginButton
              onPress={async () => {
                // const {data}: any = await authApi.getUserInfo();
                // console.log('로그인시 멤버데이터:', data);
                // setMember(data);
                navigation.navigate('NicknameScreen' as never);
              }}
              name={'구글로 시작'}
              image={GOOGLE_ICON}
              kind="Google"
            />
          </ButtonContainer>
        </>
      ) : (
        <KakaoLoginView>
          <WebView
            // incognito={true} // 시크릿 모드
            scalesPageToFit={true}
            source={{
              uri: 'http://52.79.234.33:8080/oauth2/authorization/kakao',
            }}
            // To avoid 403 disallowed useragent 구글 보안 정책
            userAgent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
            sharedCookiesEnabled={true}
            thirdPartyCookiesEnabled={true}
            injectedJavaScript={INJECTED_JAVASCRIPT}
            javaScriptEnabled={true}
            onMessage={event => loginApi(event.nativeEvent.data)}
          />
        </KakaoLoginView>
      )}
    </Wrapper>
  );
};

export default LoginScreen;

const Wrapper = styled.View`
  flex: 1;
  background-color: white;
  padding-horizontal: 11%;
  padding-bottom: 9%;
`;

const DuderImageContainer = styled.View`
  flex: 4;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-around;
`;

const KakaoLoginView = styled.View`
  width: 100%;
  height: 100%;
`;
