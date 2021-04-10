import { FunctionComponent } from 'react';
import { Navbar, Search, Info, User } from '../components'

const Dashboard: FunctionComponent = () => {
  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
    </main>
  );
}

export default Dashboard;