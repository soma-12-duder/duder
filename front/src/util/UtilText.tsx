import React from 'react';
import styled from 'styled-components/native';

const UtilText = ({content, size = '16px'}: any) => {
  return (
    <Wrapper>
      <Content size={size}>{content}</Content>
    </Wrapper>
  );
};

export default UtilText;

const Wrapper = styled.View``;

const Content = styled.Text`
  font-size: ${(props: any) => props.size};
`;
