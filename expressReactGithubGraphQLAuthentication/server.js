const { GraphQLServer } = require("graphql-yoga");

require("dotenv").config();

const fetch = require("node-fetch");

const typeDefs = `
  type Query {
    hello(name: String): String!
    githubLoginUrl: String!
  }
  type Mutation {
    authorizeWithGithub(code: String!): AuthPayload
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type User {
      id:Int!
      name:String!
      avatar_url:String!
  }
`;

const resolvers = {
  Query: {
    githubLoginUrl: () =>
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user`,
  },
  Mutation: {
    authorizeWithGithub: async (parent, { code }) => {
      // 1. Obtain data from GitHub
      let githubUser = await requestGithubUser({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
      });

      // 2. Package the results in a single object, write the value to currentUser global variable
      currentUser = {
        name: githubUser.name,
        id: githubUser.id,
        githubLogin: githubUser.login,
        githubToken: githubUser.access_token,
        avatar: githubUser.avatar_url,
      };

      // create user and their token with jsonwebtoken in case they don't exist

      //....

      // 3. Return user data and their token
      return { user: currentUser, token: "myToken" };
    },
  },
};

const requestGithubUser = async (credentials) => {
  const res = await requestGithubToken(credentials);

  const { access_token } = res;
  const githubUser = await requestGithubUserAccount(access_token);
  return { ...githubUser, access_token };
};

const requestGithubToken = async (credentials) =>
  await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(JSON.stringify(error));
    });

const server = new GraphQLServer({ typeDefs, resolvers });
server.start({ port: process.env.PORT || 4000, endpoint: "/graphql" }, () =>
  console.log("Server is running on localhost:4000")
);

const requestGithubUserAccount = async (token) =>
  await fetch(`https://api.github.com/user?access_token=${token}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
