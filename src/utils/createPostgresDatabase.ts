import execa from 'execa';
import { DatabaseOptions } from '../types';

const createDatabase = async (database: string) => {
  const { failed, stdout, stderr } = await execa('createdb', [database]);
  if (failed) {
    throw new Error(stderr);
  }
  return stdout;
};

const createPostgresUser = async (username: string, password: string) => {
  const { failed, stdout, stderr } = await execa('psql', [
    '-c',
    `create user ${username} with password '${password}';`,
  ]);
  if (failed && !stderr.includes('already exists')) {
    throw new Error(stderr);
  }
  return stdout;
};

const grantPrivilegesToUserOnDatabase = async (database: string, username: string) => {
  const { failed, stdout, stderr } = await execa('psql', [
    '-c',
    `grant all privileges on database ${database} to ${username};`,
  ]);
  if (failed) {
    throw new Error(stderr);
  }
  return stdout;
};

export const createPostgresDatabase = async ({
  database,
  username,
  password,
}: DatabaseOptions): Promise<void> => {
  await createDatabase(database);
  await createPostgresUser(username, password);
  await grantPrivilegesToUserOnDatabase(database, username);
};
