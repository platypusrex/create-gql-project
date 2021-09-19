import execa from 'execa';
import { Readable } from 'stream';

export const initPrismaMigration = (cwd: string): Readable | null => {
  return execa('npx', ['prisma', 'migrate', 'dev', '-n', 'init'], { cwd }).stdout;
};
