import * as React from "react";
import ReactDOM from "react-dom";
import { Router, Redirect } from "@reach/router";
import Auth from "./components/auth";
import Dashboard from "./components/dashboard/dashboard";

class App extends React.Component {
  isLoggedIn = false;

  render() {
    return (
      <Router>
        <Redirect from="/" to="admin/login" />
        <Dashboard path="/admin/dashboard" />
        <Auth default path="/admin/login" />
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
