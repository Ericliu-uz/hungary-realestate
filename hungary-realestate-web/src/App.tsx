import React, { FC } from 'react';
import { AuthProvider } from 'auth';
import { GlobalStyle, ThemeProvider } from 'styles';
import Routes from 'routes';

export const App: FC = () => (
  <ThemeProvider>
    <GlobalStyle />
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </ThemeProvider>
);
