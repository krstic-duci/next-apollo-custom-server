import { stitchSchemas } from "@graphql-tools/stitch";
import { mergeResolvers } from "@graphql-tools/merge";

import usersSchema from "./users";
import productsSchema from "./products";
import { delegateProductResolver } from "./resolvers";
import extendedTypeDefs from "./typeDefs";

const resolvers = mergeResolvers([
  usersSchema?.resolvers || {},
  productsSchema?.resolvers || {},
  {
    User: {
      product: delegateProductResolver(productsSchema, "getProduct"),
    },
  },
]);

const schema = stitchSchemas({
  subschemas: [productsSchema, usersSchema],
  mergeTypes: true,
  mergeDirectives: true,
  typeDefs: extendedTypeDefs,
  resolvers,
});

export { schema };
