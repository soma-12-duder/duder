import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';

interface Style {
  height: number;
  width: string | number;
  backgroundColor: string;
}

interface Props {
  onPress: any;
  height: number;
  width: string | number;
  content: any;
  color: string;
  backgroundColor: string;
}

interface Content {
  color: string;
}

const UtilButton = ({
  onPress,
  height = 50,
  width = '100%',
  backgroundColor = 'white',
  color = 'black',
  content,
}: Props) => {
  return (
    <Wrapper height={height} width={width} backgroundColor={backgroundColor}>
      <Button onPress={onPress}>
        <ButtonContent color={color}>{content}</ButtonContent>
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
  font-size: 15px;
  letter-spacing: -0.3;
  color: ${(props: Content) => props.color};
`;
