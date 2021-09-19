import 'reflect-metadata';
import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { redis as client } from './redis';
import { allowedOrigins, sessionName as name, sessionSecret as secret } from './utils/config';

const bootstrap = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [__dirname + '/resolvers/*.ts'],
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  const app = express();
  const redisStore = connectRedis(session);

  app.use(
    session({
      store: new redisStore({ client }),
      name,
      secret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
      },
    })
  );

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: allowedOrigins.split(','),
    },
  });

  app.listen(4000, () => console.log('App listening on http://localhost:4000/graphql'));
};

bootstrap();
