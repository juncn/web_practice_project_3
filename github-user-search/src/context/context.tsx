import React, { createContext, FunctionComponent } from 'react';

// const rootUrl = 'https://api.github.com';

const GithubContext = createContext('');

const GithubProvider: FunctionComponent = ({ children }) => {
  return <GithubContext.Provider value={''}>{ children }</GithubContext.Provider>;
};

export { GithubContext, GithubProvider };