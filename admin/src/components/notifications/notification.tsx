import React, { Component } from "react";
import { Snackbar, SnackbarContent } from "@material-ui/core";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { NotificationInstance } from "stores/userSessionStore";

interface P {
  notification: NotificationInstance;
  onClose?: VoidFunction;
}

@observer
export default class Notification extends Component<P> {
  @observable
  open: boolean = true;

  handleClose() {
    this.open = !this.open;
  }

  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={this.open}
        autoHideDuration={this.props.notification.autoHideDuration || 5000}
        onClose={this.handleClose}
      >
        <SnackbarContent message={this.props.notification.message} />
      </Snackbar>
    );
  }
}
