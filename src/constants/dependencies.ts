import { Template } from '../types';

export const dependencies: Record<Template, { deps: string[]; devDeps: string[] }> = {
  [Template.withAuthentication]: {
    deps: [
      'apollo-server-express',
      'bcryptjs',
      'class-validator',
      'connect-redis',
      'dotenv',
      'express',
      'express-session',
      'graphql',
      'ioredis',
      'pg',
      'reflect-metadata',
      'type-graphql',
      'typeorm',
    ],
    devDeps: [
      '@types/bcryptjs',
      '@types/connect-redis',
      '@types/cors',
      '@types/express',
      '@types/express-session',
      '@types/graphql',
      '@types/ioredis',
      '@types/node',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'eslint',
      'eslint-config-prettier',
      'eslint-plugin-prettier',
      'prettier',
      'ts-node-dev',
      'typescript',
    ],
  },
};
