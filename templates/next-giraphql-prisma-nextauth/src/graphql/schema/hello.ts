import { builder } from '../builder';

builder.queryFields((t) => ({
  hello: t.field({
    type: 'String',
    args: {
      name: t.arg.string()
    },
    resolve: (_, { name }) => `Hello ${name ?? 'world'}!`
  })
}));
