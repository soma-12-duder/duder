import React from 'react';
import {
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styled from 'styled-components/native';
import {BROWN} from '../util/Color';
import UtilButton from '../util/UtilButton';
import UtilText from '../util/UtilText';

const NicknameScreen = ({navigation}: any) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, paddingHorizontal: '12%', backgroundColor: 'white'}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Wrapper>
          <EmptyContainer />
          <NicknameContainer>
            <UtilText size={24} content={'닉네임을'} />
            <UtilText size={24} content={'입력해주세요.'} />
            <TextInput placeholder={'닉네임'} />
            <UtilButton
              backgroundColor={BROWN}
              color={'white'}
              content={'확인'}
              onPress={() => navigation.navigate('BottomTab')}
            />
          </NicknameContainer>
        </Wrapper>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default NicknameScreen;

const Wrapper = styled.KeyboardAvoidingView`
  flex: 1;
`;

const EmptyContainer = styled.View`
  flex: 1;
`;

const NicknameContainer = styled.View`
  flex: 5;
`;
