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
  const [followers, setFollowers] = useState(mockFollowers);
  const [repos, setRepos] = useState(mockRepos);
  const [remainRequests, setRemainRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: '' });

  const searchGithubUser = async (user: string) => {
    toggleError();
    setIsLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch(err =>
      console.log(err)
    );

    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;
    
      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`)
      ]).then((results) => {
        const [repos, followers] = results;
        const fulfilled = 'fulfilled';
        if (repos.status === fulfilled) {
          setRepos(repos.value.data);
        }
        if (followers.status === fulfilled) {
          setFollowers(followers.value.data);
        }
      });
    } else {
      toggleError(true, 'there is no user with that username');
    }

    checkRemainRequests();
    setIsLoading(false);
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
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
