import { createMuiTheme } from '@material-ui/core';

export const muiTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
    button: {
      fontWeight: 'bold',
    },
    h1: {
      fontSize: '4.5rem',
      fontWeight: 100,
      lineHeight: 1.3,
    },
    h2: {
      fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(),
      fontSize: '2.0625rem',
      fontWeight: 200,
      lineHeight: 1.625,
    },
    h3: {
      fontFamily: ['Arial', 'sans-serif'].join(),
      fontSize: '1.375rem',
      fontWeight: 400,
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: ['Arial', 'sans-serif'].join(),
      fontSize: '1em',
      fontWeight: 400,
      lineHeight: 1.625,
      fontStyle: 'italic',
    },
    h5: {
      fontFamily: ['Arial', 'sans-serif'].join(),
      fontSize: '0.83em',
      fontWeight: 400,
      lineHeight: 1.625,
    },
    h6: {
      fontFamily: ['Arial', 'sans-serif'].join(),
      fontSize: '0.67em',
      fontWeight: 400,
      lineHeight: 1.625,
    },
    body1: {
      fontFamily: ['Arial', 'sans-serif'].join(),
      fontSize: '1em',
      lineHeight: '1.625',
    },
    body2: {
      fontSize: '.8em',
      lineHeight: '1.625',
    },
    overline: {
      fontSize: '.75rem',
      letterSpacing: '1px',
      textTransform: 'uppercase',
    },
  },
  palette: {
    primary: {
      main: '#2D9CDB',
    },
    secondary: {
      main: '#D81B60',
    },
    text: {
      primary: '#222',
    },
  },
});
