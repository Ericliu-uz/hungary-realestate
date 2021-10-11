import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Layout } from 'antd';
import styled from 'styles';
import bannerBg from 'assets/cover.jpeg';
import { Logo } from 'components';

const { Header } = Layout;

const Banner = styled.div<{ bg: string }>`
  position: absolute;
  width: 100%;
  height: 60vh;
  background-image: url(${(props) => props.bg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const StyledHeader = styled(Header)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  margin-bottom: 0;
  margin-left: ${({ theme }) => theme.size.spacing.sm}px;
  color: ${({ theme }) => theme.palette.paper[0]};
  font-weight: 700;
`;

const StyledButton = styled(Button)`
  width: 100px;
  color: ${({ theme }) => theme.palette.paper[0]};
  font-weight: 700;
`;

export const Home: FC = () => {
  console.log('render home');
  return (
    <Layout>
      <Banner bg={bannerBg} />
      <StyledHeader>
        <LogoContainer>
          <Logo height={50} />
          <Title>Hungary Realestate</Title>
        </LogoContainer>
        <span>
          <Link to="/login">
            <StyledButton size="large" type="link" ghost>
              Sign in
            </StyledButton>
          </Link>
          <Link to="/signup">
            <StyledButton size="large" ghost>
              Join
            </StyledButton>
          </Link>
        </span>
      </StyledHeader>
    </Layout>
  );
};
