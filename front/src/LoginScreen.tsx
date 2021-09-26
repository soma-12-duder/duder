/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from 'react';
import {View, TouchableOpacity, Text, Button} from 'react-native';
import axios from 'axios';
import styled from 'styled-components/native';

const LoginScreen = () => {
  return (
    <Wrapper>
      <KakaoButton
        onPress={async () => {
          console.log('hi');
          try {
            const response = await axios.get('http://localhost:8080');
          } catch (e) {
            console.error(e);
          }

          return;
        }}>
        <ButtonContainer>
          <ButtonText>카카오 로그인</ButtonText>
        </ButtonContainer>
      </KakaoButton>
    </Wrapper>
  );
};

export default LoginScreen;

const KakaoButton = styled.TouchableOpacity``;

const Wrapper = styled.View``;

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
