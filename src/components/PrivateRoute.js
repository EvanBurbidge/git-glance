import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/loginContext";

export const ProtectedRoute = ({ children, ...rest }) => {
  const { gitToken } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        gitToken?.length ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
