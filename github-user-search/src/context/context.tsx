import { createContext, FunctionComponent, useEffect, useState } from 'react';
import axios from 'axios';
import { mockUser, mockRepos, mockFollowers } from './mockData/mockData';

const rootUrl = 'https://api.github.com';

interface ContextProps {
  githubUser: any;
  repos: any[];
  followers: any[];
  remainRequests: number;
  error: {
    show: boolean;
    msg: string;
  };
  searchGithubUser: (user: string) => void;
  isLoading: boolean;
}

const GithubContext = createContext<Partial<ContextProps>>({});

const GithubProvider: FunctionComponent = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  // eslint-disable-next-line
  const [followers, setFollowers] = useState(mockFollowers);
  // eslint-disable-next-line
  const [repos, setRepos] = useState(mockRepos);
  // Request, Loading
  const [remainRequests, setRemainRequests] = useState(0);
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);
  // Error
  const [error, setError] = useState({ show: false, msg: '' });

  const searchGithubUser = async (user: string) => {
    toggleError();
    // set loading
    const response = await axios(`${rootUrl}/users/${user}`).catch(err =>
      console.log(err)
    );
    if (response) {
      console.log(response);
      setGithubUser(response.data);
    } else {
      toggleError(true, 'there is no user with that username');
    }
    checkRemainRequests();
  };

  // Check rate
  const checkRemainRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let { remaining } = data.rate;
        setRemainRequests(remaining);
        if (remaining === 0) {
          toggleError(
            true,
            'Sorry, you have exceeded your hourly rate limit!!!'
          );
        }
      })
      .catch(err => console.log(err));
  };

  // Setting error
  const toggleError = (show = false, msg = '') => {
    setError({ show, msg });
  };

  useEffect(checkRemainRequests, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        remainRequests,
        error,
        searchGithubUser,
        isLoading
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
