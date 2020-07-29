import execa from 'execa';
import { DatabaseOptions } from '../types';

export const createPostgresDatabase = async ({
  database,
  username,
  password,
}: DatabaseOptions): Promise<void> => {
  const { failed: createDbFailed, stderr: createDbErr } = await execa('createdb', [database]);
  if (createDbFailed) {
    throw new Error(createDbErr);
  }

  const { failed: createUserFailed, stderr: createUserErr } = await execa('psql', [
    '-c',
    `create user ${username} with password '${password}';`,
  ]);
  if (createUserFailed && !createDbErr.includes('already exists')) {
    throw new Error(createUserErr);
  }

  const { failed: grantPrivFailed, stderr: grantPrivErr } = await execa('psql', [
    '-c',
    `grant all privileges on database ${database} to ${username};`,
  ]);
  if (grantPrivFailed) {
    throw new Error(grantPrivErr);
  }
};
