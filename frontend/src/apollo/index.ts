import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  connectToDevTools: true,
  uri: process.env.REACT_APP_BACKEND_URL,
  cache: new InMemoryCache(),
});

export default client;
