import * as React from "react";
import { Router, Redirect } from "@reach/router";
import Auth from "components/auth";
import Dashboard from "components/dashboard/dashboard";
import {
  MuiThemeProvider,
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  Grid
} from "@material-ui/core";
import materialTheme from "config/theme";

import fabricationLabLogo from "./assets/fabricationlab-logo.png";
import Notifications from "components/notifications/notifications";

export default class App extends React.Component {
  isLoggedIn = false;

  render() {
    return (
      <MuiThemeProvider theme={materialTheme}>
        <AppBar position="sticky">
          <Toolbar>
            <Grid container spacing={16} alignItems="center">
              <Grid item>
                <Avatar src={fabricationLabLogo} />
              </Grid>
              <Grid item>
                <Typography variant="h6" color="inherit">
                  Digital Fabrication Lab Admin
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Router>
          <Redirect from="/" to="admin/login" />
          <Dashboard path="/admin/dashboard" />
          <Auth default path="/admin/login" />
        </Router>
        <Notifications />
      </MuiThemeProvider>
    );
  }
}
