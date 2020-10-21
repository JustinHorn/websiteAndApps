import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import ApolloProvider from "./setUpApollo";

import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider>
        <App />
      </ApolloProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
