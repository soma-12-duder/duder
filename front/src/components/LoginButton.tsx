import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';

const LoginButton = ({onPress, name, image, kind}: any) => {
  return (
    <Wrapper kind={kind}>
      <KakaoButton onPress={onPress}>
        {kind === 'Kakao' ? (
          <LogoImage source={image} />
        ) : (
          <Image
            source={image}
            style={{resizeMode: 'contain', width: 30, left: -7}}
          />
        )}
        <ButtonText>{name}</ButtonText>
        <RemainSpace />
      </KakaoButton>
    </Wrapper>
  );
};

export default LoginButton;

const Wrapper = styled.View<{kind: any}>`
  border-radius: 3px;
  width: 100%;
  height: 50px;
  background-color: ${(props: any) =>
    props.kind === 'Kakao' ? '#ffe500' : '#4285F4'};
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
