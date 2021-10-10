import * as styledComponents from 'styled-components';
import { Theme } from './ThemeProvider';

const {
  default: styled,
  css,
  createGlobalStyle,
  ThemeProvider,
  ThemeContext,
  ServerStyleSheet,
} = styledComponents as unknown as styledComponents.ThemedStyledComponentsModule<Theme>;

export { css, createGlobalStyle, ThemeProvider, ThemeContext, ServerStyleSheet };
export default styled;
