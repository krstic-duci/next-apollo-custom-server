import { makeExecutableSchema } from "@graphql-tools/schema";
import gql from "graphql-tag";

import { Schema } from "../types";

const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@doe.com",
    postIds: ["1", "2"],
  },
];

const posts = [
  {
    id: "1",
    title: "First Post",
    content: "Content of the first post.",
  },
  {
    id: "2",
    title: "Second Post",
    content: "Content of the second post.",
  },
];

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
  }

  type Query {
    getUser(id: ID!): User
  }

  type Mutation {
    updateUser(id: ID!, name: String!, email: String!): User!
  }
`;

// https://the-guild.dev/graphql/tools/docs/resolvers#resolver-function-signature
const resolvers = {
  Query: {
    getUser: (parent: any, args: any, context: any, info: any) => {
      return users.find((user) => user.id === args.id);
    },
  },
  User: {
    posts: (parent: any, args: any, context: any, info: any) =>
      parent.postIds.map((postId: string) =>
        posts.find((post) => post.id === postId)
      ),
  },
  Mutation: {
    updateUser: (parent: any, args: any, context: any, info: any) => {
      const { id, name, email } = args;
      return {
        id,
        name,
        email,
      };
    },
  },
};

const usersSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
}) as Schema;

export default usersSchema;
