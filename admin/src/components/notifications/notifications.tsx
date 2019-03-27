import React, { Component } from "react";
import userSessionStore from "stores/userSessionStore";
import { observer } from "mobx-react";
import Notification from "./notification";

@observer
export default class Notifications extends Component {
  render() {
    return (
      <div>
        {userSessionStore.notifications &&
        userSessionStore.notifications.length > 0
          ? userSessionStore.notifications.map((notification, index) => {
              return <Notification key={index} notification={notification} />;
            })
          : null}
      </div>
    );
  }
}
