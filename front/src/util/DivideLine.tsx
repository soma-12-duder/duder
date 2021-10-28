import React from 'react';
import styled from 'styled-components/native';

interface Style {
  height: number;
}

const DivideLine = ({height = 10}: Style) => {
  return <Wrapper height={height}></Wrapper>;
};

export default DivideLine;

const Wrapper = styled.View`
  height: ${(props: Style) => props.height};
`;
