import React, { Component } from "react";
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { NotificationInstance } from "stores/userSessionStore";
import CloseIcon from "@material-ui/icons/Close";

interface P {
  notification: NotificationInstance;
  onClose?: VoidFunction;
}

@observer
export default class Notification extends Component<P> {
  @observable
  displayNotification: boolean = true;

  handleClose = () => {
    this.displayNotification = false;
  };

  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={this.displayNotification}
        autoHideDuration={this.props.notification.autoHideDuration || 5000}
        onClose={this.handleClose}
      >
        <SnackbarContent
          style={{ color: "white" }}
          message={this.props.notification.message}
          action={
            <IconButton color="inherit" onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          }
        />
      </Snackbar>
    );
  }
}
