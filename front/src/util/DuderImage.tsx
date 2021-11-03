import React from 'react';
import styled from 'styled-components/native';
import DUDER from '../assets/images/DUDER_IMAGE.png';

const DuderImage = () => {
  return (
    <Wrapper>
      <AppImage source={DUDER}></AppImage>
    </Wrapper>
  );
};

export default DuderImage;

const Wrapper = styled.View`
  width: 208;
  height: 124;
`;

const AppImage = styled.Image`
  width: 100%;
  height: 100%;
`;
