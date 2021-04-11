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
  const [githubUser, setGithubUser] = useState(mockUser);
  const [followers, setFollowers] = useState(mockFollowers);
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