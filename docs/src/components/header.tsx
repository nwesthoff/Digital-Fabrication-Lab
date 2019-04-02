import React, { Component } from 'react';
import Logo from '../images/vanberlo-logo.svg';
import {
  Grid,
  Hidden,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import DrawerList from './drawer';

interface Props {
  siteTitle?: string;
}

interface State {
  open: boolean;
}

export default class Header extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { open: false };
  }

  handleClose = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <AppBar color="primary" position="fixed">
        <Toolbar>
          <Drawer
            variant="temporary"
            anchor="left"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <DrawerList />
          </Drawer>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            spacing={32}
          >
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={this.handleClose}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Grid container justify="center" alignItems="center">
                <Grid item>
                  <img
                    height="32"
                    src={Logo}
                    style={{ margin: '0 0.4rem 0 0' }}
                  />
                </Grid>
                <Grid item>
                  <Hidden smDown>
                    <Typography variant="h6" style={{ color: 'white' }}>
                      {this.props.siteTitle}
                    </Typography>
                  </Hidden>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}
