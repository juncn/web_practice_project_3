import { FunctionComponent, useContext } from 'react';
import { Navbar, Search, UserInfo, User, Repos } from '../components'
import { GithubContext } from '../context/context';
import loadingImg from '../images/preloader.gif';

const Dashboard: FunctionComponent = () => {
  const { isLoading } = useContext(GithubContext);

  return (
    <main>
      <Navbar />
      <Search />
      { isLoading 
        ? <img src={loadingImg} className="loading-img" alt="loading" />
        : <>
            <UserInfo />
            <User />
            <Repos />
          </>
      }
    </main>
  );
}

export default Dashboard;