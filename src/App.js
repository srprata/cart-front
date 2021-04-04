import React from 'react';
import { BrowserRouter } from "react-router-dom";
//Components
import Routes from './routes';

//Graphql
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  //dev
  // const url = 'http://localhost:8080/graphql';
  //heroku
  const url = `https://app-cart-service.herokuapp.com/graphql`

  const client = new ApolloClient({
    uri: url,
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