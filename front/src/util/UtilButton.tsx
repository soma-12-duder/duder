import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';
import {NK500} from './Color';

interface Style {
  height: number;
  width: string | number;
  backgroundColor: string;
}

interface Props {
  onPress: any;
  height?: number;
  width?: string | number;
  content: any;
  color?: string;
  backgroundColor?: string;
  family?: string;
}

interface Content {
  color: string;
  family: string;
}

const UtilButton = ({
  onPress,
  height = 50,
  width = '100%',
  backgroundColor = 'white',
  color = 'black',
  content,
  family = NK500,
}: Props) => {
  return (
    <Wrapper height={height} width={width} backgroundColor={backgroundColor}>
      <Button onPress={onPress}>
        <ButtonContent color={color} family={family}>
          {content}
        </ButtonContent>
      </Button>
    </Wrapper>
  );
};

export default UtilButton;

const Wrapper = styled.View`
  height: ${(props: Style) => props.height};
  width: ${(props: Style) => props.width};
  background-color: ${(props: Style) => props.backgroundColor};
  border-radius: 3px;
`;

const Button = styled.TouchableOpacity`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ButtonContent = styled.Text`
  font-family: ${(props: Content) => props.family};
  font-size: 15px;
  letter-spacing: -0.3;
  color: ${(props: Content) => props.color};
`;
