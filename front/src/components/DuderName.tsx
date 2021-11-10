import React from 'react';
import styled from 'styled-components/native';
import DUDER_NAME from '../assets/images/DUDER_NAME.png';

const DuderName = () => {
  return (
    <Wrapper>
      <AppImage source={DUDER_NAME}></AppImage>
    </Wrapper>
  );
};

export default DuderName;

const Wrapper = styled.View`
  width: 80;
  height: 40;
`;

const AppImage = styled.Image`
  width: 100%;
  height: 100%;
`;
