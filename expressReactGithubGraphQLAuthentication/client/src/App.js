import React, { useEffect } from "react";

import { gql, useMutation } from "@apollo/client";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";

import qs from "qs";

const authWithGithub = gql`
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
  const [mutate, { data, error }] = useAuthWithCode();

  return (
    <div className="App">
      <Switch>
        <Route path="/">
          <h1>React App</h1>
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=user`} //its okay to expose the client_id
          >
            Authenticate with github!
          </a>
          {data && <h1>Hello {data.authorizeWithGithub.user.name}</h1>}
        </Route>
      </Switch>
    </div>
  );
}

const useAuthWithCode = () => {
  const [mutate, { data, error }] = useMutation(authWithGithub);
  const location = useLocation();

  const { deleteParam } = useHistoryDeleteParam();

  useEffect(() => {
    if (urlHasRedirectPath(location)) {
      const code = getUrlParam(location, "code");
      if (code) {
        mutate({ variables: { code } });
        deleteParam("code"); // delete code param token so it does not get bookmarked since its expires
      }
    }
  }, [location]);

  useEffect(() => {
    if (data) {
      //.. store credentials and save user to context
    }
  }, [data]);

  return [mutate, { data, error }];
};

const urlHasRedirectPath = (location) => {
  return location.pathname.includes(process.env.REACT_APP_REDIRECT_PATH);
};

const getUrlParam = (location, param) => {
  const params = new URLSearchParams(location.search);
  return params.get(param);
};

const useHistoryDeleteParam = () => {
  const history = useHistory();
  const location = useLocation();

  const deleteParam = (paramDel) => {
    const search = qs.parse(location, { ignoreQueryPrefix: true });
    const newSearch = {};
    Object.keys(search).forEach(
      (param) => param !== paramDel && (newSearch[param] = search.param)
    );
    history.replace({ ...location, search: qs.stringify(newSearch) });
  };

  return { deleteParam };
};

export default App;
