import { useState} from 'react';
import { useQuery, gql } from '@apollo/react-hooks';
import { useAuth } from '../context/loginContext';

const VIEWER = gql`
  {
    viewer{
      login
    }
  }
`;

const PR_QUERY = gql`
  query prs($after: String, $queryStr: String!) {
    search( first: 10, type: ISSUE, query: $queryStr, after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      nodes {
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
    }
  }
`;

const queries = {
  created: "is:open is:pr archived:false",
  assigned: "is:open is:pr archived:false",
  mentioned: "is:open is:pr archived:false",
  review_requested: "is:open is:pr archived:false",
}

export const usePrs = () => {
  const { gitToken } = useAuth();
  const [currentQuery, setCurrentQuery] = useState('created');
  const { data: user = { viewer: { login: '' } } } = useQuery(VIEWER, {
    skip: !gitToken,
  })

  const handleGetQueryString = () => {
    switch (currentQuery) {
      case 'assigned':
        return `${queries.assigned} assignee:${user.viewer.login}`
      case 'mentioned':
        return `${queries.assigned} mentions:${user.viewer.login}`
      case 'review_requested':
        return `${queries.assigned} review-requested:${user.viewer.login}`
      default:
        return `${queries.created} author:${user.viewer.login}`
    }
  };

  const { data, loading: pullsLoading, fetchMore } = useQuery(PR_QUERY, {
    skip: !user.viewer.login.length || !gitToken,
    variables: {
      after: null,
      queryStr: handleGetQueryString(),
    },
  });

  const handleFetchMore = () => {
    const { endCursor } = data.search.pageInfo;
    fetchMore({
      variables: {
        after: endCursor,
        queryStr: handleGetQueryString(),
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        fetchMoreResult.search.nodes = [
          ...prevResult.search.nodes,
          ...fetchMoreResult.search.nodes,
        ]
        return fetchMoreResult;
      }
    })
  }

  return {
    pullsLoading,
    setCurrentQuery,
    fetchOlderPrs: handleFetchMore,
    pulls: data ? data.search.nodes : [],
    pagingInfo: data ? data.search.pageInfo : {},
  }
}