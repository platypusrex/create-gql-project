import execa from 'execa';

export const isDatabaseUnique = async (database: string): Promise<string> => {
  const { stdout } = await execa('psql', ['-Atqc', `\\list ${database}`]);
  return stdout;
};
