import { useContext } from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from './containers/Login';
import Settings from './containers/Settings';
import Repositories from './containers/Repositories';
import UserContext from './context/userContext';


const ProtectedRoute = ({ children, ...rest }) => {
  const user = useContext(UserContext);
  if (!user.user) {
    return null
  }
  return (
    <Route
      {...rest}
      token={user.user.accessToken}
      render={({ location }) =>
        user.user.accessToken ? (
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
}

const Router = () => {
  
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <ProtectedRoute path="/">
        <Repositories />
      </ProtectedRoute>
      <ProtectedRoute path="/settings">
        <Settings />
      </ProtectedRoute>
    </Switch>
  )
}

export default Router;