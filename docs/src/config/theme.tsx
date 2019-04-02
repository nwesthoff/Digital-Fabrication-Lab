import { createMuiTheme } from '@material-ui/core';

export const muiTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ['"IBM Plex Mono"', 'sans-serif'].join(),
    h1: {
      fontFamily: ['"IBM Plex Sans"', 'sans-serif'].join(),
    },
    h2: {
      fontFamily: ['"IBM Plex Sans"', 'sans-serif'].join(),
    },
    h3: {
      fontFamily: ['"IBM Plex Sans"', 'sans-serif'].join(),
    },
    h4: {
      fontFamily: ['"IBM Plex Sans"', 'sans-serif'].join(),
    },
    h5: {
      fontFamily: ['"IBM Plex Sans"', 'sans-serif'].join(),
    },
    h6: {
      fontFamily: ['"IBM Plex Sans"', 'sans-serif'].join(),
    },
    button: {
      fontWeight: 'bold',
    },
    body1: {
      fontSize: '1.3rem',
    },
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
