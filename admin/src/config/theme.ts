import { createMuiTheme } from "@material-ui/core/styles";

const materialTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ["Arial", "-apple-system", "BlinkMacSystemFont"].join(","),
    body1: {
      fontWeight: "bold"
    },
    h1: {
      fontWeight: 100,
      fontFamily: "Roboto"
    },
    h2: {
      fontWeight: 100,
      fontFamily: "Roboto"
    },
    h3: {
      fontWeight: 100,
      fontFamily: "Roboto"
    },
    h4: {
      fontWeight: 100,
      fontFamily: "Roboto"
    },
    h5: {
      fontWeight: 100,
      fontFamily: "Roboto"
    },
    h6: {
      fontWeight: 100,
      fontFamily: "Roboto"
    },
    button: {
      fontFamily: "Roboto"
    }
  },
  palette: {
    primary: {
      dark: "#0077A4",
      main: "#2D9CDB",
      light: "#60D7FF"
    },
    secondary: {
      main: "#1C1C73"
    }
  }
});

export default materialTheme;
