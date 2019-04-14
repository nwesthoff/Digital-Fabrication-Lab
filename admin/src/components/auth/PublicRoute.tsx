import * as React from "react";

const PublicRoute = ({ component: Component, ...rest }) => (
  <Component {...rest} />
);

export default PublicRoute;
