import { IResolvers } from '@graphql-tools/utils';
import { GraphQLSchema, DocumentNode } from 'graphql';

export type Schema = GraphQLSchema & {
  resolvers: IResolvers;
  typeDefs: DocumentNode;
};
