import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import { AuthProvider } from 'auth';
import { GlobalStyle, ThemeProvider } from 'styles';
import { PropertyProvider } from 'context';
import Routes from 'routes';

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required.',
};

export const App: FC = () => (
  <ConfigProvider form={{ validateMessages }}>
    <ThemeProvider>
      <GlobalStyle />
      <AuthProvider>
        <PropertyProvider>
          <Routes />
        </PropertyProvider>
      </AuthProvider>
    </ThemeProvider>
  </ConfigProvider>
);
