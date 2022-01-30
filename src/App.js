import logo from './logo.svg';
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { onError } from '@apollo/client/link/error';

import { Countries } from './Components/Countries';
import { Country } from './Components/Country';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      console.log(`GraphQL error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: 'https://countries.trevorblades.com/' }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Countries />} />
          <Route path="/country/:code" element={<Country />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};
