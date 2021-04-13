import { createContext, FunctionComponent, useEffect, useState } from 'react';
import axios from 'axios';
import { mockUser, mockRepos, mockFollowers } from './mockData/mockData';

const rootUrl = 'https://api.github.com';

interface ContextProps {
  githubUser: any;
  repos: any[];
  followers: any[];
  remainRequests: number;
}

const GithubContext = createContext<Partial<ContextProps>>({});

const GithubProvider: FunctionComponent = ({ children }) => {
  // eslint-disable-next-line
  const [githubUser, setGithubUser] = useState(mockUser);
  // eslint-disable-next-line
  const [followers, setFollowers] = useState(mockFollowers);
  // eslint-disable-next-line
  const [repos, setRepos] = useState(mockRepos);
  // Request, Loading
  // eslint-disable-next-line
  const [remainRequests, setRemainRequests] = useState(0);
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);
  // Error

  // Check rate
  const checkRemainRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        console.log(data);
        let { remaining } = data.rate;
        setRemainRequests(remaining);
        if (remaining === 0) {
          // throw an error
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    checkRemainRequests();
  }, []);

  return (
    <GithubContext.Provider value={{ githubUser, repos, followers, remainRequests }}>
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
