import React, { FC } from 'react';
import styled from 'styles';
import { LogoWithTitle } from 'components';

const Container = styled.div<{ size: number }>`
  position: relative;
  width: ${({ size }) => size}px;
  margin: auto;
  padding: ${({ theme }) => theme.size.spacing.xxl}px ${({ theme }) => theme.size.spacing.xxxl}px;
  display: block;
  background-color: ${({ theme }) => theme.palette.paper[0]};
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 3px 0px;
`;

const TitleContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.size.spacing.lg}px;
  text-align: center;
`;

const Title = styled.h1`
  margin-top: ${({ theme }) => theme.size.spacing.xxl}px;
  font-size: 24px;
  font-weight: 700;
`;

interface CardProps {
  title: string;
  hasLogo?: boolean;
  size?: number;
}

export const Card: FC<CardProps> = ({ children, title, hasLogo = true, size = 500 }) => (
  <Container size={size}>
    <TitleContainer>
      {hasLogo && <LogoWithTitle width={200} />}
      <Title>{title}</Title>
    </TitleContainer>
    {children}
  </Container>
);
