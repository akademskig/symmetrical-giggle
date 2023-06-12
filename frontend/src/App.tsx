import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import { IntlProvider } from 'react-intl';
import client from './apollo';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './components/routes';

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <IntlProvider locale="hr" defaultLocale="hr">
            <AppRoutes />
          </IntlProvider>
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
