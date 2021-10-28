import React from 'react';
import styled from 'styled-components/native';

const LoginButton = ({onPress, name, image}: any) => {
  return (
    <Wrapper>
      <KakaoButton onPress={onPress}>
        <LogoImage source={image} />
        <ButtonText>{name}</ButtonText>
        <RemainSpace />
      </KakaoButton>
    </Wrapper>
  );
};

export default LoginButton;

const Wrapper = styled.View`
  border-radius: 3px;
  width: 100%;
  height: 50px;
  background-color: #ffe500;
  justify-content: center;
  align-items: center;
`;

const KakaoButton = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 700;
`;

const LogoImage = styled.Image`
  width: 17px;
  height: 16px;
`;

const RemainSpace = styled.View`
  width: 17px;
`;
