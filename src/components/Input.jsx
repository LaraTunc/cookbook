import React from 'react';
import styled from 'styled-components';

const InputComp = ({ children, type, value, onChange, disabled }) => {
  return (
    <Input type={type} value={value} onChange={onChange} disabled={disabled}>
      {children}
    </Input>
  );
};

export default InputComp;

const Input = styled.input`
  margin: 10px;
  min-width: 400px;
  background: inherit;
  border: 1px solid gray;
  border-radius: 5px;
  line-height: 1.5;
`;
