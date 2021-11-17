/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Image} from 'react-native';
import styled from 'styled-components/native';
import MESSAGE_ICON from '../assets/images/MESSAGE_ICON.png';

interface Props {
  content: any;
  onChangeText: any;
  onPress: Function;
  height: string;
}

const TextInputButton = ({
  content,
  onChangeText,
  onPress,
  height = '70px',
}: Props) => {
  return (
    <InputView height={height}>
      <InputWraaper>
        <CommentInput
          multiline={true}
          numberOfLines={3}
          onChangeText={onChangeText}
          value={content}
        />
        <CommentInputButton onPress={onPress as never}>
          <Image
            source={MESSAGE_ICON}
            style={{
              resizeMode: 'contain',
              width: 20,
              left: -1,
              top: 1,
            }}
          />
        </CommentInputButton>
      </InputWraaper>
    </InputView>
  );
};

export default TextInputButton;

const InputView = styled.View`
  background-color: #ffffff;
  width: 100%;
  height: ${(props: any) => props.height};
  justify-content: center;
  align-items: center;
`;

const InputWraaper = styled.View`
  width: 96%;
  height: 50px;
  border-radius: 22px;
  background-color: #f0f0f0;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const CommentInput = styled.TextInput`
  width: 83%;
  height: 50px;
`;

const CommentInputButton = styled.TouchableOpacity`
  background-color: #c38753;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 2%;
  justify-content: center;
  align-items: center;
`;
