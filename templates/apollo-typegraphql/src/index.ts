import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [__dirname + '/resolvers/*.ts'],
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  const app = express();
  server.applyMiddleware({ app });

  app.listen(4000, () => console.log('App listening on http://localhost:4000/graphql'));
};

bootstrap();
