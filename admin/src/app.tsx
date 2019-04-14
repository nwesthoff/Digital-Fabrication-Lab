import * as React from "react";
import { Router } from "@reach/router";
import Auth from "components/auth/Auth";
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
import ProtectedRoute from "components/auth/ProtectedRoute";
import PublicRoute from "components/auth/PublicRoute";
import { observer } from "mobx-react";

@observer
export default class App extends React.Component {
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
          <PublicRoute path="/admin/login" component={Auth} />
          <ProtectedRoute
            default
            path="/admin/dashboard"
            component={Dashboard}
          />
        </Router>
        <Notifications />
      </MuiThemeProvider>
    );
  }
}
