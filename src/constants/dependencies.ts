import { Template } from '../types';

const baseDependencies = {
  deps: [
    'apollo-server-express',
    'class-validator',
    'dotenv',
    'express',
    'graphql',
    'reflect-metadata',
    'type-graphql',
  ],
  devDeps: [
    '@types/express',
    '@types/graphql',
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
};

export const dependencies: Record<Template, { deps: string[]; devDeps: string[] }> = {
  [Template.basic]: baseDependencies,
  [Template.withAuthentication]: {
    deps: [
      ...baseDependencies.deps,
      'bcryptjs',
      'connect-redis',
      'express-session',
      'ioredis',
      'pg',
      'typeorm',
    ],
    devDeps: [
      ...baseDependencies.devDeps,
      '@types/bcryptjs',
      '@types/connect-redis',
      '@types/cors',
      '@types/express-session',
      '@types/ioredis',
    ],
  },
};
