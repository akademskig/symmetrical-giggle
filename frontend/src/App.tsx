import { ApolloProvider } from '@apollo/client';
import SelectCoveragesPage from './components/pages/ClientInsurancePage/SelectCoveragesPage';
import { Provider } from 'react-redux';
import store from './redux/store';
import { IntlProvider } from 'react-intl';
import client from './apollo';

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <IntlProvider locale="hr">
          <SelectCoveragesPage />
        </IntlProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
