import React, { Component } from "react";
import userSessionStore from "stores/userSessionStore";
import Auth from "./Auth";
import { observer } from "mobx-react";

interface Props {
  component: Component;
}

@observer
export default class ProtectedRoute extends React.Component<Props> {
  render() {
    const { component: Comp, ...props } = this.props;
    return userSessionStore.isLoggedIn ? <Comp {...props} /> : <Auth />;
  }
}
