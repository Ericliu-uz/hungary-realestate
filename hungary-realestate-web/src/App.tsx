import React, { FC } from 'react';
import { AuthProvider } from 'auth';
import { GlobalStyle, ThemeProvider } from 'styles';
import { PropertyProvider } from 'context';
import Routes from 'routes';

export const App: FC = () => (
  <ThemeProvider>
    <GlobalStyle />
    <AuthProvider>
      <PropertyProvider>
        <Routes />
      </PropertyProvider>
    </AuthProvider>
  </ThemeProvider>
);
