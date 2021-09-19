import path from 'path';
import { writeFileSync } from 'fs';
import { GraphQLSchema, lexicographicSortSchema, printSchema } from 'graphql';
import { builder } from '../builder';
import './hello';

const printAppSchema = (schema: GraphQLSchema) => {
  if (process.env.NODE_ENV !== 'development') return;
  const schemaAsString = printSchema(lexicographicSortSchema(schema));
  writeFileSync(path.join(process.cwd(), 'src/graphql/schema.gql'), schemaAsString);
}

export const schema = builder.toSchema({});
printAppSchema(schema);
