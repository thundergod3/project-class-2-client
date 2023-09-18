import React from "react";
import { Route } from "react-router-dom";

export const PrivateLayout = ({
  layout: Layout,
  component: Component,
  isPrivate,
  redirect,
  title,
  ...props
}) => {
  // const isAuthenticated = useAuthenticated();
  // const { user } = useCurrentUser();

  // if (!isAuthenticated && isPrivate && user === undefined) {
  //   return <Redirect to={redirect ?? Routes.login} />;
  // }

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

export default PrivateLayout;
