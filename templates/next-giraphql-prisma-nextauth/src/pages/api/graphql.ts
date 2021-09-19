import { ApolloServer } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse } from 'next';
import { schema } from '../../graphql/schema';

const setHeaders = (res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', 'https://studio.apollographql.com');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const server = new ApolloServer({ schema });
const startServer = server.start();

const graphql = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  setHeaders(res);

  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }
  await startServer;
  await server.createHandler({
    path: '/api/graphql',
  })(req, res);
};

export default graphql;
