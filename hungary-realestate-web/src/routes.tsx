import React, { FC } from 'react';
import { BrowserRouter as Router, Route, RouteProps, Redirect, Switch } from 'react-router-dom';
import { useAuth } from 'auth';
import { CreateProperty, Home, Login, Properties, Signup } from 'pages';
import { Spinner } from 'components';

const PrivateRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { authState } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => (authState.loggedIn ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />)}
    />
  );
};

export default () => {
  const { authState } = useAuth();

  return authState.loading ? (
    <Spinner />
  ) : (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route path="/properties" exact>
          <Properties />
        </Route>
        <PrivateRoute path="/properties/create">
          <CreateProperty />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};
