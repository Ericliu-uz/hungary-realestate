import { createGlobalStyle } from './styledComponents';
import 'antd/dist/antd.less';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .ant-layout {
    min-height: 100vh;
  }
`;
