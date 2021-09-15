import { Switch, Route } from "react-router-dom";
import Login from "./containers/Login";
import Settings from "./containers/Settings";
import Pulls from "./containers/Pulls";
import { ProtectedRoute } from "./components/PrivateRoute";
import { useAuth } from "./context/loginContext";

const Router = () => {
  const { gitToken } = useAuth();
  return (
    <Switch>
      <Route path="/" exact={true}>
        <Login />
      </Route>
      <ProtectedRoute path="/pulls">
        <Pulls />
      </ProtectedRoute>
      <ProtectedRoute path="/settings">
        <Settings />
      </ProtectedRoute>
    </Switch>
  );
};

export default Router;
