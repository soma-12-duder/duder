import React from 'react';
import styled from 'styled-components/native';

interface Style {
  size: string;
  family: string;
  color: string;
}

const UtilText = ({
  family = 'NotoSansKR-Medium',
  content,
  size = '16px',
  style = {},
  color = 'black',
}: any) => {
  return (
    <Wrapper style={style}>
      <Content size={size} family={family} color={color}>
        {content}
      </Content>
    </Wrapper>
  );
};

export default UtilText;

const Wrapper = styled.View``;

const Content = styled.Text`
  font-family: ${(props: Style) => props.family};
  font-size: ${(props: Style) => props.size};
  color: ${(props: Style) => props.color};
`;
