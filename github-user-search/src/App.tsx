import { FunctionComponent } from 'react';
import { Dashboard, Login, Error } from './pages';

const App: FunctionComponent = () => {
  return (
    <div>
      <Dashboard />
      <Login />
      <Error />
    </div>
  );
}

export default App;
