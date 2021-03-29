import React from 'react';
import { BrowserRouter } from "react-router-dom";
//Components
import Routes from './routes';
//Graphql
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    cache: new InMemoryCache()
  })

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </ApolloProvider>
  );

}

export default App;