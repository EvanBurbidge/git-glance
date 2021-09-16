import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, InMemoryCache } from '@apollo/client';

import { useAuth } from './loginContext';


export const ApolloLocalProvider = ({
  children,
}) => {
  const { gitToken } = useAuth();
  const apolloClient = new ApolloClient({
    uri: "https://api.github.com/graphql",
    fetchOptions: {
      credentials: "include",
    },
    request: operation => {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${gitToken || ""}`,
        }
      });
      return operation;
    },
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  )
}