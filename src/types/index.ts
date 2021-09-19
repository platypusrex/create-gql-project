export enum Template {
  'apollo-typegraphql' = 'apollo-typegraphql',
  'apollo-typegraphql-auth' = 'apollo-typegraphql-auth',
  'next-giraphql-prisma-nextauth' = 'next-giraphql-prisma-nextauth',
}

export interface Options {
  projectDirectory: string;
  template: Template;
  git: boolean;
  pkgManager: 'yarn' | 'npm';
}

export interface DatabaseOptions {
  database: string;
  username: string;
  password: string;
}

export interface ExtendedOptions extends Options {
  templateDirectory: string;
}

export interface ListrContext extends ExtendedOptions {
  // eslint-disable-next-line @typescript-eslint/ban-types
  input?: boolean | string | Object;
  databaseOptions?: DatabaseOptions;
  isPostgresInstalled?: boolean;
}
