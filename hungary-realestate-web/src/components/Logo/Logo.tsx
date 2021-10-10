import React, { FC } from 'react';
import logo from 'assets/logo.png';

interface LogoProps {
  height?: number | 'auto';
  width?: number | 'auto';
}

export const Logo: FC<LogoProps> = ({ height, width }) => <img src={logo} alt="logo" height={height} width={width} />;
