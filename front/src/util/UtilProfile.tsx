import React from 'react';
import styled from 'styled-components/native';
import DUDER_IMAGE from '../assets/images/DUDER_IMAGE.png';

interface Props {
  width: string;
  height: string;
}

const UtilProfile = ({picture, width = '40px', height = '40px'}: any) => {
  return (
    <Wrapper width={width} height={height}>
      {picture ? (
        <ProfileImage source={{uri: `${picture}`}} resizeMode="cover" />
      ) : (
        <ProfileImage source={DUDER_IMAGE} resizeMode="contain" />
      )}
    </Wrapper>
  );
};

export default UtilProfile;

const Wrapper = styled.View`
  width: ${({width}: Props) => width};
  height: ${({height}: Props) => height};
`;

export const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 100px;
`;
