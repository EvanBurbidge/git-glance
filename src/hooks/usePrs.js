import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/loginContext';
import { getGitGraph } from '../utils/getGitGraph';

const queryBody = `
  pageInfo {
    hasNextPage
    endCursor
    startCursor
  }
  prs:nodes {
    ...on PullRequest {
      id
      url
      title
      createdAt
      reviewDecision
      comments {
        totalCount
      }
      repository {
        name
      }
      author {
        login
      }
      reviews {
        totalCount
      }
    }
  }
`

const queries = {
  created: "is:open is:pr archived:false",
  assigned: "is:open is:pr archived:false",
  mentioned: "is:open is:pr archived:false",
  review_requested: "is:open is:pr archived:false",
}

export const usePrs = () => {
  const { gitToken } = useAuth();
  const [pulls, setPulls] = useState([]);
  const [pullsLoading, setPullsLoading] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('created');
  const [pagingInfo, setPagingInfo] = useState({
    endCursor: '',
    startCursor: '',
    hasNextPage: false,
  })

  const previousQuery = useRef(null);

  const handleUpdateQuery = newQuery => {
    previousQuery.current = currentQuery;
    setCurrentQuery(newQuery);
  };

  const handleGetQueryString = username => {
    switch (currentQuery) {
      case 'assigned':
        return `${queries.assigned} assigned:${username}`
      case 'mentioned':
        return `${queries.assigned} mentions:${username}`
      case 'review_requested':
        return `${queries.assigned} review-requested:${username}`
      default:
        return `${queries.created} author:${username}`
    }
  };

  const fetchPrs = async () => {
    setPullsLoading(true);
    try {
      const { gitGraph, username } = await getGitGraph(gitToken);
      const pullsQuery = await gitGraph(`{
        search(first: 10, type:ISSUE, query: "${handleGetQueryString(username)}") {
          ${queryBody}
        }
      }`);
      setPulls(pullsQuery.search.prs);
      setPagingInfo(pullsQuery.search.pageInfo);
    } catch (e) {
      console.error(e);
    }
    setPullsLoading(false);
  }
  
  const fetchPaginatedPrs = async () => {
    setPullsLoading(true);
    try {
      const { gitGraph, username } = await getGitGraph(gitToken);
      const pullsQuery = await gitGraph(`
        query repos($after: String) {
            search(first: 10, type:ISSUE, after:$after, query: "${handleGetQueryString(username)}") {
              ${queryBody}
            }
          }
        `,
        {
          after: pagingInfo.endCursor,
        },
      );
      setPulls(pullsQuery.search.prs);
      setPagingInfo(pullsQuery.search.pageInfo);
    } catch (e) {
      console.error(e);
    }
    setPullsLoading(false);
  }

  useEffect(() => {
    if (gitToken) {
      fetchPrs();
    }
  }, [gitToken]); // eslint-disable-line

  useEffect(() => {
    if (previousQuery.current !== currentQuery) {
      fetchPrs();
    }
  }, [currentQuery]); // eslint-disable-line

  return {
    pulls,
    pagingInfo,
    pullsLoading,
    handleUpdateQuery,
    fetchPaginatedPrs,
  }
}