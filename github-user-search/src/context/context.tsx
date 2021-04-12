import { createContext, FunctionComponent, useState } from 'react';
import { mockUser, mockRepos, mockFollowers } from './mockData/mockData';

// const rootUrl = 'https://api.github.com';

interface ContextProps {
  githubUser: any;
  repos: any[];
  followers: any[];
}

const GithubContext = createContext<Partial<ContextProps>>({});

const GithubProvider: FunctionComponent = ({ children }) => {
  // eslint-disable-next-line
  const [githubUser, setGithubUser] = useState(mockUser);
  // eslint-disable-next-line
  const [followers, setFollowers] = useState(mockFollowers);
  // eslint-disable-next-line
  const [repos, setRepos] = useState(mockRepos);

  return (
    <GithubContext.Provider 
      value={{githubUser, repos, followers}}
    >
      { children }
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };