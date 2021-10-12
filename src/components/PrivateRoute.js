import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/loginContext";

export const ProtectedRoute = ({ children, ...rest }) => {
  const { gitToken } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
<<<<<<< HEAD
        gitToken ? (
=======
        gitToken?.length ? (
>>>>>>> 3a901f8060c3a7c2cd226d4c5341346d57140a93
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
