import React from 'react';
import styled from 'styled-components';

const ButtonComp = ({ children, onClick }) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default ButtonComp;

const Button = styled.button`
  font-size: 15px;
  border-radius: 5px;
  border: 2px solid #fec8a7;
  background: #fceca5;
  margin: 10px;
  padding: 10px;
  :hover {
    box-shadow: 0px 0px 5px 2px #80bbff;
  }
`;