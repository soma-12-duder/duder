import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';

interface Style {
  height: number;
  width: number;
}

interface Props {
  height: number;
  width: number;
  content: any;
}

const UtilButton = ({height = 50, width = 100, content}: Props) => {
  return (
    <Wrapper height={height} width={width}>
      <Button>
        <Text>{content}</Text>
      </Button>
    </Wrapper>
  );
};

export default UtilButton;

const Wrapper = styled.View`
  height: ${(props: Style) => props.height};
  width: ${(props: Style) => props.width};
  background-color: red;
`;

const Button = styled.TouchableOpacity`
  height: 100%;
  width: 100%;
`;
