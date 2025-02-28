import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { DefaultFcProps } from '../react_utils';
import { muiTheme } from './mui-theme';

export const withMuiTheme = (Component: React.FC<DefaultFcProps>) => (props: DefaultFcProps) => (
  <ThemeProvider theme={muiTheme}>
    <Component {...props} />
  </ThemeProvider>
);
