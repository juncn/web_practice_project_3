import { FunctionComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Dashboard, Login, Error } from './pages';

const App: FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <Dashboard />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="*">
          <Error></Error>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
