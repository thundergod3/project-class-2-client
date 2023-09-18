import React from "react";
import { Route } from "react-router-dom";

export const PublicRoute = ({
  layout: Layout,
  component: Component,
  title,
  ...props
}) => {
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

export default PublicRoute;
