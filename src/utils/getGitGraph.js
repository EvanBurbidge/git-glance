import { Octokit } from '@octokit/rest';
import { graphql } from '@octokit/graphql';

export const getOctokit = token => new Octokit({
  auth: `Bearer ${token},`
});

export const getGitGraph = async token => {
  const gitGraph = graphql.defaults({
    headers: {
      authorization: `token ${token}`,
    }
  });
  const user = await gitGraph(
    `{
      viewer {
        login
        email
      }
    }`
  );
  return {
    gitGraph,
    user,
  }
}