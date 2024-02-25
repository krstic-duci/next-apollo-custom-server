import { makeExecutableSchema } from "@graphql-tools/schema";
import { gql } from "graphql-tag";

import { Schema } from "../types";

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String
  }

  type Query {
    getProduct(id: ID!): Product
  }
`;

// https://the-guild.dev/graphql/tools/docs/resolvers#resolver-function-signature
const resolvers = {
  Query: {
    getProduct: (parent: any, args: any, context: any, info: any) => {
      return {
        id: args.id,
        name: "Sample Product",
        price: 19.99,
      };
    },
  },
};

const productsSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
}) as Schema;

export default productsSchema;
