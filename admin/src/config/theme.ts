import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

const materialTheme = createMuiTheme({
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
