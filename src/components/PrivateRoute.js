import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/loginContext";

export const ProtectedRoute = ({ children, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser ? (
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
