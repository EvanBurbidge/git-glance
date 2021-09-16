import React, { useState, useEffect } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, InMemoryCache } from '@apollo/client';
import { useAuth } from './loginContext';
import { Loading } from '../components/Loading';

const apolloClient = token => new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `bearer ${token}`
  }
})

export const ApolloLocalProvider = ({
  children,
}) => {
  const { gitToken } = useAuth();
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (gitToken && !client) {
      setClient(
        apolloClient(gitToken)
      )
    }
  }, [gitToken, client]);

  if (!client) {
    return <Loading />
  }

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}