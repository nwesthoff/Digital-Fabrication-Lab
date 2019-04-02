import { createMuiTheme } from '@material-ui/core';

export const muiTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
    button: {
      fontWeight: 'bold',
    },
    h1: {
      fontSize: '2.986em',
    },
    h2: {
      fontSize: '2.488em',
    },
    h3: {
      fontSize: '2.074em',
    },
    h4: {
      fontSize: '1.728em',
    },
    h5: {
      fontSize: '1.44em',
    },
    h6: {
      fontSize: '1.2em',
    },
    body1: {
      fontFamily: ['Arial', 'sans-serif'].join(),
      fontSize: '18px',
      lineHeight: '32px',
    },
    body2: {
      fontSize: '16px'
    }
  },
  palette: {
    primary: {
      main: '#2D9CDB',
    },
    secondary: {
      main: '#D81B60',
    },
  },
});
