import React from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import logo from './logo.png'
import './App.css';
import Launches from "./components/Launches"

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <img
          src={logo}
          alt='spacex logo'
          style={{width: 300, height: 200}}
          />
      </div>
      <Launches />
    </ApolloProvider>
  );
}

export default App;
