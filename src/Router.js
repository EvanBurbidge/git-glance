import { Switch, Route } from "react-router-dom";
import Login from "./containers/Login";
import Settings from "./containers/Settings";
import Repositories from "./containers/Repositories";
import { ProtectedRoute } from "./components/PrivateRoute";

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact={true}>
        <Login />
      </Route>
      <ProtectedRoute path="/repos">
        <Repositories />
      </ProtectedRoute>
      <ProtectedRoute path="/settings">
        <Settings />
      </ProtectedRoute>
    </Switch>
  );
};

export default Router;
