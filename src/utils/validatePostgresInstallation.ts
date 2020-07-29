import execa from 'execa';

export const validatePostgresInstallation = async (): Promise<boolean> => {
  const { stdout, failed } = await execa('which', ['psql']);
  return !(!stdout || failed);
};
