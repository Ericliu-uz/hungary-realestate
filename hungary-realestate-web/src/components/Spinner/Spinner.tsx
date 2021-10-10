import React from 'react';
import styled from 'styles';

const SpinnerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const SpinnerIcon = styled.div`
  display: block;
  position: relative;
  left: 50%;
  top: 50%;
  width: 150px;
  height: 150px;
  margin: -75px 0 0 -75px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: ${({ theme }) => theme.palette.branding.primary.normal};
  animation: spin 2s linear infinite;

  &:before {
    content: '';
    position: absolute;
    top: 6px;
    left: 6px;
    right: 6px;
    bottom: 6px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: ${({ theme }) => theme.palette.branding.primary.light};
    animation: spin 3s linear infinite;
  }

  &:after {
    content: '';
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: ${({ theme }) => theme.palette.branding.primary.dark};
    animation: spin 1.5s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Spinner = () => (
  <SpinnerContainer>
    <SpinnerIcon />
  </SpinnerContainer>
);
