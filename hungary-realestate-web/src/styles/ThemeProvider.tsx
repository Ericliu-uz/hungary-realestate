import React, { FC, useContext } from 'react';
import { ThemeContext, ThemeProvider as TP } from './styledComponents';
import { Palette } from './colors';
import { Size } from './sizes';

export interface Theme {
  palette: typeof Palette;
  size: typeof Size;
}

const theme: Theme = {
  palette: Palette,
  size: Size,
};

export const ThemeProvider: FC = ({ children }) => <TP theme={theme}>{children}</TP>;

export const useTheme = () => useContext(ThemeContext);
