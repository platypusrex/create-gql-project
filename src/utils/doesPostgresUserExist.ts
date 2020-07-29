import execa from 'execa';

export const doesPostgresUserExist = async (username: string): Promise<string> => {
  const { stdout } = await execa('psql', ['-Atqc', `\\du ${username}`]);
  return stdout;
};
