// Imports
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ Component, exact, path, authedUser }) => {
  console.log(Component, exact, path, authedUser);
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) =>
        authedUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
              path: path,
            }}
          />
        )
      }
    />
  );
};

// Export
export default connect(({ authedUser }) => ({ authedUser }))(PrivateRoute);
