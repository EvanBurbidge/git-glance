import { useState, useEffect } from 'react';
import { useAuth } from '../context/loginContext'
import { getGitGraph } from '../utils/getGitGraph';

const reposQuery = `
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
        comments {
          totalCount
        }
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
`

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

const formatQuery = ({ viewer: { repositories: { nodes, pageInfo } } }) => {
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
  const [reposLoading, setReposLoading] = useState(false);
  const [previousAfterCursor, setPreviousAfterCursor] = useState("");
  const [pagingInfo, setPagingInfo] = useState({
    startCursor: null,
    endCursor: null,
    hasNextPage: false,
    hasPreviousPage: false,
    currentEndCursor: "",
    currentStartCursor: "",
    previousEndCursor: "",
    previousStartCursor: "",
  });

  const handleAfterFetch = query => {
    const { formatted, pageInfo } = formatQuery(query);
    setRepos(formatted);
    setPagingInfo({
      ...pagingInfo,
      ...pageInfo,
      currentEndCursor: "",
      currentStartCursor: "",
    });
  }

  const fetchRepos = async () => {
    setReposLoading(true);
    try {
      const { gitGraph } = await getGitGraph(gitToken);
      const query = await gitGraph(`
      {
        viewer { 
          repositories(first: 5, isFork: false, orderBy:{ field: UPDATED_AT, direction: DESC }) {
            ${reposQuery}
          }
        }
      }
      `);
      handleAfterFetch(query);
      setPreviousAfterCursor(pagingInfo.startCursor);
    } catch (e) {
      console.error(e);
    }
    setReposLoading(false);
  };

  const fetchOlderRepos = async () => {
    setReposLoading(true);
    try {
      const { gitGraph } = await getGitGraph(gitToken);
      const query = await gitGraph(`
        query repos($after: String){
          viewer { 
            repositories(first: 5, isFork: false, after: $after, orderBy:{ field: UPDATED_AT, direction: DESC }) {
              ${reposQuery}
            }
          }
        }
      `,
        {
          after: pagingInfo.currentEndCursor,
        }
      );
      setPreviousAfterCursor(pagingInfo.currentEndCursor);
      handleAfterFetch(query);
    } catch (e) {
      console.error(e);
    }
    setReposLoading(false);
  };

  const fetchNewerRepos = async () => {
    setReposLoading(true);
    try {
      const { gitGraph } = await getGitGraph(gitToken);
      const query = await gitGraph(`
        query repos($after: String){
          viewer { 
            repositories(first: 5, isFork: false, after: $after, orderBy:{ field: UPDATED_AT, direction: DESC }) {
              ${reposQuery}
            }
          }
        }
      `,
        {
          // after: pagingInfo.endCursor,
          after: previousAfterCursor,
        }
      );
      handleAfterFetch(query);
    } catch (e) {
      console.error(e);
    }
    setReposLoading(false);
  };


  useEffect(() => {
    if (gitToken) {
      fetchRepos();
    }
  }, [gitToken]); // eslint-disable-line

  useEffect(() => {
    if (pagingInfo.currentEndCursor.length) {
      fetchOlderRepos();
    }
    if (pagingInfo.currentStartCursor.length) {
      fetchNewerRepos();
    }
  }, [pagingInfo]); // eslint-disable-line

  const setCurrentAfter = () => setPagingInfo({
    ...pagingInfo,
    currentStartCursor: "",
    currentEndCursor: pagingInfo.endCursor,
  });

  const setCurrentBefore = () => setPagingInfo({
    ...pagingInfo,
    currentEndCursor: pagingInfo.endCursor,
    currentStartCursor: pagingInfo.startCursor,
  });

  return {
    repos,
    pagingInfo,
    repoToExpand,
    setRepoToExpand,
    setCurrentAfter,
    setCurrentBefore,
    loading: reposLoading
  }

}