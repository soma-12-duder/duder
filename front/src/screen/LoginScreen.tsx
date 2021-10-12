import React, {useState} from 'react';
import styled from 'styled-components/native';
import {WebView} from 'react-native-webview';
import {useRecoilState} from 'recoil';
import {ProfileUrlState} from '../states/MemberState';
import {useNavigation} from '@react-navigation/core';

import LoginButton from '../components/buttons/LoginButton';
import DuderImage from '../util/DuderImage';

const LoginScreen = () => {

  const [isToggle, setIsToggle] = useState(true);
  const [profileUrl, setProfileUrl] = useRecoilState(ProfileUrlState);
  const navigation = useNavigation();

  const loginApi = async (data: any) => {
    try {
      console.log(JSON.parse(data));
      navigation.navigate('BottomTab');
      const {accessToken, email} = JSON.parse(data);
      console.log(accessToken, email);
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
          </DuderImageContainer>
          <ButtonContainer>
            <LoginButton
              onPress={() => setIsToggle(!isToggle)}
              name={'카카오톡으로 시작'}
            />
            <LoginButton
              onPress={() => navigation.navigate('BottomTab')}
              name={'다음 페이지'}
            />
          </ButtonContainer>
        </>
      ) : (
        <KakaoLoginView>
          <WebView
            incognito={true} // 시크릿 모드
            scalesPageToFit={true}
            source={{uri: 'http://localhost:8080/oauth2/authorization/kakao'}}
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
`;

const DuderImageContainer = styled.View`
  flex: 5;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.View`
  flex: 1;
  justify-content: space-around;
  background-color: red;
  padding: 10px;
`;

const KakaoLoginView = styled.View`
  width: 100%;
  height: 100%;
`;
