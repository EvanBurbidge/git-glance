import React from 'react';
import styled from 'styled-components';
import { PRIMARY, WARNING } from '../constants/Colours';

const baseStyles = `
  padding: 8px 30px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  border-radius: 3px;
  outline: 0;
`;

const PrimaryButton = styled.button`
  ${baseStyles}
  background: ${PRIMARY};
`;

const SecondaryButton = styled.button`
  ${baseStyles}
  color: ${PRIMARY};
  background: #FFFFFF;
  border: 1px solid ${PRIMARY};
`;

const WarningButton = styled.button`
  ${baseStyles}
  background: ${WARNING};
`;

const getButtonComponent = type => {
  switch(type){
    case "secondary":
      return SecondaryButton;
    case "warning":
      return WarningButton;
    default:
      return PrimaryButton;
  }
}

export const Button = ({
  type = '',
  children,
  ...rest
}) => {
  debugger;
  const Component = getButtonComponent(type);

  return (
    <Component
      {...rest}
    >
      {children}
    </Component>
  )
}