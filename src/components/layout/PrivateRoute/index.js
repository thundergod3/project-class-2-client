import React from "react";
import { Route, Redirect } from "react-router-dom";

import useAuthenticated from "hooks/useAuthenticated";
import { Routes } from "constants/routes";

export const PrivateRoute = ({
  layout: Layout,
  component: Component,
  redirect,
  title,
  ...props
}) => {
  const { isAuthenticated, userData } = useAuthenticated();

  if (!isAuthenticated && userData === undefined) {
    return <Redirect to={redirect ?? Routes.login} />;
  }

  return (
    <Route
      {...props}
      render={(ownProps) => {
        if (Layout) {
          return (
            <Layout title={title}>
              <Component {...props} {...ownProps} />
            </Layout>
          );
        } else {
          return <Component {...props} {...ownProps} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
