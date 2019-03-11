import * as React from "react";
import ReactDOM from "react-dom";
import { Router, Redirect } from "@reach/router";
import Auth from "./src/components/auth";
import Dashboard from "./src/components/dashboard/dashboard";
import { MuiThemeProvider } from "@material-ui/core";
import materialTheme from "./src/config/theme";

class App extends React.Component {
  isLoggedIn = false;

  render() {
    return (
      <MuiThemeProvider theme={materialTheme}>
        <Router>
          <Redirect from="/" to="admin/login" />
          <Dashboard path="/admin/dashboard" />
          <Auth default path="/admin/login" />
        </Router>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
