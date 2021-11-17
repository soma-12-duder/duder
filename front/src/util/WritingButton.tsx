import React from 'react';
import styled from 'styled-components/native';
import {NK700} from './Color';

interface Props {
  content: String;
  onPress: Function;
}

const WritingButton = ({content}: Props) => {
  return (
    <Wrapper>
      <ButtonContent>{content}</ButtonContent>
    </Wrapper>
  );
};

export default WritingButton;

const Wrapper = styled.TouchableOpacity`
  background-color: #c38753;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 55px;
  justify-content: center;
  align-items: center;
`;

const ButtonContent = styled.Text`
  font-family: ${NK700};
  color: #ffffff;
`;
