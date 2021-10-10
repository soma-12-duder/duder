import React, {useState} from 'react';
import styled from 'styled-components/native';
import {WebView} from 'react-native-webview';
import {useRecoilState} from 'recoil';
import {ProfileUrlState} from '../states/MemberState';
import {useNavigation} from '@react-navigation/core';

const LoginScreen = () => {
  const [isToggle, setIsToggle] = useState(false);
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
      <KakaoButton
        onPress={() => {
          setIsToggle(!isToggle);
        }}>
        <ButtonContainer>
          <ButtonText>카카오 로그인</ButtonText>
        </ButtonContainer>
      </KakaoButton>
      <KakaoButton
        onPress={() => {
          navigation.navigate('BottomTab');
        }}>
        <ButtonContainer>
          <ButtonText>다음 페이지</ButtonText>
        </ButtonContainer>
      </KakaoButton>
      {isToggle && (
        <KakaoLoginView>
          <WebView
            incognito={true} // 시크릿 모드
            scalesPageToFit={true}
            source={{uri: 'http://localhost:8080'}}
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

const KakaoButton = styled.TouchableOpacity``;

const Wrapper = styled.View``;

const KakaoLoginView = styled.View`
  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.View`
  border-radius: 8px;
  width: 150px;
  height: 50px;
  background-color: yellow;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 700;
`;
