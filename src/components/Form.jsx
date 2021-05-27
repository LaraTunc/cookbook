import React from 'react';
import styled from 'styled-components';

const FormComp = ({ children }) => {
  return <Form>{children}</Form>;
};

export default FormComp;

const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
  :last-child {
    border-left: 1px dotted gray;
  }
  * {
    flex: 1;
  }
`;
