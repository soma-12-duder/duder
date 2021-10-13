import React from 'react';
import styled from 'styled-components/native';

const LoginButton = ({onPress, name}: any) => {
  return (
    <Wrapper>
      <KakaoButton onPress={onPress}>
        <ButtonText>{name}</ButtonText>
      </KakaoButton>
    </Wrapper>
  );
};

export default LoginButton;

const Wrapper = styled.View`
  border-radius: 8px;
  width: 100%;
  height: 48px;
  background-color: #ffe812;
  justify-content: center;
  align-items: center;
`;

const KakaoButton = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 700;
`;
