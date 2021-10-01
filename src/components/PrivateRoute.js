import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/loginContext";

export const ProtectedRoute = ({ children, ...rest }) => {
  const { gitToken } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        gitToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
