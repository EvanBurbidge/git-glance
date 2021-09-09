import { graphql } from '@octokit/graphql';

export const getGitGraph = async token => {
  const gitGraph = graphql.defaults({
    headers: {
      authorization: `token ${token}`,
    }
  });
  return {
    gitGraph,
  }
}