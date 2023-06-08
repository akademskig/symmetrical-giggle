import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import ClientInsurancePage from './components/pages/ClientInsurancePage/ClientInsurancePage';
import { Provider } from 'react-redux';
import store from './redux/store';

const client = new ApolloClient({
  connectToDevTools: true,
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});
function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ClientInsurancePage />
      </ApolloProvider>
    </Provider>
  );
}

export default App;
