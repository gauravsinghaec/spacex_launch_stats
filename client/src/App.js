import React from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.png'
import './App.css';
import Launches from "./components/Launches"
import LaunchDetails from "./components/LaunchDetails"

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <img
            src={logo}
            alt='spacex logo'
            style={{width: 300, height: 200}}
            />
        </div>
        <Route exact path="/" component={Launches}/>
        <Route exact path="/launch/:flight_number" component={LaunchDetails}/>
      </Router>
    </ApolloProvider>
  );
}

export default App;
