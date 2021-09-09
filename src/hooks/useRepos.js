import { useState, useEffect } from 'react';
import { useAuth } from '../context/loginContext'
import { getGitGraph } from '../utils/getGitGraph';

const checkIfPrCanMerge = pr => {
  const { reviews: { nodes: reviewNodes = [] }, mergeable } = pr;
  const reviewRequests = reviewNodes.reduce((acc, item) => {
    if (item.state === 'CHANGES_REQUESTED') {
      acc.CHANGES_REQUESTED += 1;
    }
    if (item.state === 'COMMENTED') {
      acc.COMMENTED += 1;
    }
    return acc;
  }, {
    CHANGES_REQUESTED: 0,
    COMMENTED: 0,
  });

  return {
    ...reviewRequests,
    MERGEABLE: mergeable === 'MERGEABLE',
  };
}

const formatQuery = ({ viewer: { repositories: { nodes, edges, pageInfo } } }) => {
  const formatted = [];
  for (let i = 0; i < nodes.length; ++i) {
    const formattedItem = {
      id: nodes[i].id,
      href: nodes[i].url,
      name: nodes[i].name,
      prCount: nodes[i].pullRequests.totalCount,
      prs: nodes[i].pullRequests.nodes.map(pr => ({
        ...pr,
        mergeStatus: checkIfPrCanMerge(pr),
      })),
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
  const [repoToExpand, setRepoToExpand] = useState(null);
  const [pagingInfo, setPagingInfo] = useState({
    startCursor: null,
    endCursor: null,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const fetchRepos = async () => {
    try {
      const { gitGraph } = await getGitGraph(gitToken);
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
                  nodes {
                    id
                    title
                    url
                    createdAt
                    mergeable
                    reviews(first: 50, states: [CHANGES_REQUESTED, COMMENTED]) {
                      nodes {
                        state
                      }
                    }
                    author {
                      login
                    }
                    state
                  }
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
    repoToExpand,
    setRepoToExpand,
  }

}