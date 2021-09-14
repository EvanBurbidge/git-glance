import { graphql } from '@octokit/graphql';

export const getGitGraph = async token => {
  const gitGraph = graphql.defaults({
    headers: {
      authorization: `token ${token}`,
    }
  });
  const { viewer: { login: username } } = await gitGraph(`{ viewer { login } }`);
  return {
    gitGraph,
    username,
  }
}