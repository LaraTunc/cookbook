import React from 'react';
import styled from 'styled-components';

const TitleComp = ({ children }) => {
  return <Title>{children}</Title>;
};

export default TitleComp;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 5px;
`;
