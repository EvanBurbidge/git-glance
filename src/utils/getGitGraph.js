import { graphql } from '@octokit/graphql';

export const getGitGraph = token => {
  const withDefaults = graphql.defaults({
    headers: {
      authorization: `bearer ${token}`,
    }
  });
  return withDefaults;
}