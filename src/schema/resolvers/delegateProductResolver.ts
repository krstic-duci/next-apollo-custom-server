import { OperationTypeNode } from "graphql";
import { delegateToSchema } from "@graphql-tools/delegate";

import { Schema } from "../types";

export const delegateProductResolver = (
  productsSchema: Schema,
  fieldName: string
) => ({
  selectionSet: `{ id }`,
  resolve(parent: any, args: any, context: any, info: any) {
    return delegateToSchema({
      schema: productsSchema,
      operation: OperationTypeNode.QUERY,
      fieldName,
      args: {
        id: parent.id,
      },
      context,
      info,
    });
  },
});
