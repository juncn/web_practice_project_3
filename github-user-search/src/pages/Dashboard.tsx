import { FunctionComponent } from 'react';
import { Navbar, Search, UserInfo, User, Repos } from '../components'

const Dashboard: FunctionComponent = () => {
  return (
    <main>
      <Navbar />
      <Search />
      <UserInfo />
      <User />
      <Repos />
    </main>
  );
}

export default Dashboard;