import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Layout } from 'antd';
import { useAuth } from 'auth';
import styled, { css } from 'styles';
import { LogoWithTitle } from 'components';

const AntHeader = Layout.Header;

const StyledHeader = styled(AntHeader)<HeaderProps>`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ transparent, theme }) => (transparent ? 'transparent' : theme.palette.paper[0])};
  z-index: 100;
  ${({ transparent }) =>
    !transparent &&
    css`
      box-shadow: rgb(0 0 0 / 20%) 0px 1px 3px 0px;
    `}
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
`;

const StyledButton = styled(Button)`
  min-width: 120px;
  font-weight: 700;
`;

interface HeaderProps {
  transparent?: boolean;
}

export const Header: FC<HeaderProps> = ({ transparent }) => {
  const { authState } = useAuth();

  return (
    <StyledHeader transparent={transparent}>
      <LogoContainer to="/">
        <LogoWithTitle height={50} />
      </LogoContainer>
      {authState.loggedIn ? (
        <Link to="/properties/create">
          <StyledButton size="large" type="primary">
            Publish Property
          </StyledButton>
        </Link>
      ) : (
        <span>
          <Link to="/login">
            <StyledButton size="large" type="link">
              Sign in
            </StyledButton>
          </Link>
          <Link to="/signup">
            <StyledButton size="large" type="primary">
              Join
            </StyledButton>
          </Link>
        </span>
      )}
    </StyledHeader>
  );
};
