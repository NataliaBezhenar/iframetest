import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  mode: (document.body.className || 'light') as 'light' | 'dark'
};