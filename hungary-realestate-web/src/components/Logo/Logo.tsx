import React, { FC } from 'react';
import logo from 'assets/logo.svg';
import logoWithTitle from 'assets/logo2.svg';

interface LogoProps {
  height?: number | 'auto';
  width?: number | 'auto';
}

export const Logo: FC<LogoProps> = ({ height, width }) => <img src={logo} alt="logo" height={height} width={width} />;

export const LogoWithTitle: FC<LogoProps> = ({ height, width }) => <img src={logoWithTitle} alt="logo" height={height} width={width} />;
