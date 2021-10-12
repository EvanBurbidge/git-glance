<<<<<<< HEAD
=======
import { signOut } from '@firebase/auth';
>>>>>>> 3a901f8060c3a7c2cd226d4c5341346d57140a93
import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/react-hooks';
import { useAuth } from '../context/loginContext';

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
<<<<<<< HEAD
  const { gitToken, signOut } = useAuth();
  const [currentQuery, setCurrentQuery] = useState('created');
  console.log(gitToken)
  const { data: user = { viewer: { login: '' } }, error: viewerError } = useQuery(VIEWER, {
    skip: !gitToken.length,
  });
=======
  const { gitToken, currentUser, signOut } = useAuth();
  const [currentQuery, setCurrentQuery] = useState('created');
>>>>>>> 3a901f8060c3a7c2cd226d4c5341346d57140a93

  const handleGetQueryString = () => {
    switch (currentQuery) {
      case 'assigned':
        return `${queries.assigned} assignee:${currentUser?.reloadUserInfo.screenName}`
      case 'mentioned':
        return `${queries.assigned} mentions:${currentUser?.reloadUserInfo.screenName}`
      case 'review_requested':
        return `${queries.assigned} review-requested:${currentUser?.reloadUserInfo.screenName}`
      default:
        return `${queries.created} author:${currentUser?.reloadUserInfo.screenName}`
    }
  };

<<<<<<< HEAD
  const { data, loading: pullsLoading, fetchMore, error: prError } = useQuery(PR_QUERY, {
    skip: !user.viewer.login.length || !gitToken,
=======
  const { data, loading: pullsLoading, fetchMore, error } = useQuery(PR_QUERY, {
    skip: !gitToken,
>>>>>>> 3a901f8060c3a7c2cd226d4c5341346d57140a93
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

  useEffect(() => {
<<<<<<< HEAD
    if (viewerError) {
      if (viewerError.networkError.statusCode === 401) {
        debugger;
        signOut()
      }
    }
    if (prError) {
      if (prError.networkError.statusCode === 401) {
        debugger;
        signOut()
      }
    }
  }, [viewerError, prError]); // eslint-disable-line
=======
    if (error) {
      if (error.networkError.statusCode === 401) {
        signOut();
      }
    }
  }, [error]); // eslint-disable-line
>>>>>>> 3a901f8060c3a7c2cd226d4c5341346d57140a93

  return {
    pullsLoading,
    setCurrentQuery,
    fetchOlderPrs: handleFetchMore,
    pulls: data ? data.search.nodes : [],
    pagingInfo: data ? data.search.pageInfo : {},
  }
}