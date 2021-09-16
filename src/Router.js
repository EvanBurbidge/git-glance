import { Switch, Route } from "react-router-dom";
import Login from "./containers/Login";
import Pulls from "./containers/Pulls";
import { ProtectedRoute } from "./components/PrivateRoute";

const Router = () => (
  <Switch>
    <Route path="/" exact={true}>
      <Login />
    </Route>
    <ProtectedRoute path="/pulls">
      <Pulls />
    </ProtectedRoute>
  </Switch>
);

export default Router;
