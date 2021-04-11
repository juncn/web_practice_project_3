import { FunctionComponent } from 'react';
import { Navbar, Search, UserInfo, User } from '../components'

const Dashboard: FunctionComponent = () => {
  return (
    <main>
      <Navbar />
      <Search />
      <UserInfo />
      <User />
    </main>
  );
}

export default Dashboard;