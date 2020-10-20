import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import { gql, useMutation } from "@apollo/client";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

const ADD_TODO = gql`
  mutation authorizeWithGithub($code: String!) {
    authorizeWithGithub(code: $code) {
      token
      user {
        name
        id
      }
    }
  }
`;

function App() {
  const location = useLocation();

  const [mutate, { data, error }] = useMutation(ADD_TODO);

  useEffect(() => {
    if (location.pathname.includes("login")) {
      const params = new URLSearchParams(location.search);
      const code = params.get("code");
      if (code) {
        mutate({ variables: { code } });
      }
    }
  }, [location]);

  console.log(data);

  return (
    <div className="App">
      <Switch>
        <Route path="/">
          <h1>React App</h1>
          <a
            href={`https://github.com/login/oauth/authorize?client_id=d3b7ac8c153a6f360536&scope=user`}
          >
            Authenticate with github!
          </a>
          {data && <h1>Hello {data.authorizeWithGithub.user.name}</h1>}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
