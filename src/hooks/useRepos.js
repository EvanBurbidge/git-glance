import { useState, useEffect } from 'react';
import { useAuth } from '../context/loginContext'
import { getGitGraph } from '../utils/getGitGraph';

const formatQuery = ({ viewer: { repositories: { nodes, edges, pageInfo } }}) => {
  const formatted = [];
  for (let i = 0; i < nodes.length; ++i) {
    const formattedItem = {
      id: nodes[i].id,
      href: nodes[i].url,
      name: nodes[i].name,
      prCount: nodes[i].pullRequests.totalCount,
    }
    formatted.push(formattedItem)
  }
  return {
    formatted,
    pageInfo
  };
}


export const useRepos = () => {
  const { gitToken } = useAuth();
  const [repos, setRepos] = useState([]);
  const [pagingInfo, setPagingInfo] = useState({
    startCursor: null,
    endCursor: null,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const fetchRepos = async () => {
    const { gitGraph } = await getGitGraph(gitToken);
    try {
      const query = await gitGraph(`
        {
          viewer { 
            repositories(first: 10, isFork: false, orderBy:{ field: UPDATED_AT, direction: DESC }) {
              pageInfo {
                endCursor
                startCursor
                hasNextPage,
                hasPreviousPage
              }
              nodes {
                id
                name
                url
                pullRequests(first:50, states: [OPEN]) {
                  totalCount
                }
              }
            }
          }
        }
      `);
      const { formatted, pageInfo } = formatQuery(query);
      setRepos(formatted);
      setPagingInfo(pageInfo);
    } catch (e) {
      console.error(e);
    }
  };


  useEffect(() => {
    if (gitToken) {
      fetchRepos();
    }
  }, [gitToken]); // eslint-disable-line

  return {
    repos,
    pagingInfo,
  }

}