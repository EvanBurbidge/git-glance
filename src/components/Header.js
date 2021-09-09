import React from 'react';
import styled from 'styled-components';
import { PRIMARY } from '../constants/Colours';
import { useAuth } from '../context/loginContext';
import { Button } from './Button';

const StyledHeader = styled.div`
  width: 400px;
  height: auto;
  background: ${PRIMARY};
  display: flex;
  flex-direction: row;
  justify-content: between;
  align-items: center;
`;

const StyledTitle = styled.h3`
  color: #FFFFFF;
  font-weight: bold;
  font-size: 20px;
  flex-grow:1;
`;

const HeaderWrapper = styled.div`
  margin-right: 10px;
  margin-left: 5px;
  width: 100%;
  display: flex;
  justify-content: between;
  align-items: center;
`;

export const Header = () => {
  const { signOut } = useAuth();
  return (
    <StyledHeader>
      <HeaderWrapper>
        <StyledTitle>
          Git Glance
        </StyledTitle>
        <Button onClick={signOut} type="secondary">
          Signout
        </Button>
      </HeaderWrapper>
    </StyledHeader>
  )
};