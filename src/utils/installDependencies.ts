import execa from 'execa';
import { Readable } from 'stream';
import { ListrContext } from '../types';

type ExecParams = Record<
  ListrContext['pkgManager'],
  {
    args: string[];
    output: 'stdout' | 'stderr';
  }
>;

const execParams: ExecParams = {
  npm: {
    args: ['install', '--verbose'],
    output: 'stderr',
  },
  yarn: {
    args: ['add', '--verbose'],
    output: 'stdout',
  },
};

interface InstallDependencies extends Pick<ListrContext, 'pkgManager' | 'projectDirectory'> {
  deps: string[];
  saveDev?: boolean;
}

export const installDependencies = ({
  pkgManager,
  projectDirectory: cwd,
  deps,
  saveDev,
}: InstallDependencies): Readable | null => {
  const depArgs = saveDev ? ['-D', ...deps] : deps;
  const args = [...execParams[pkgManager].args, ...depArgs];
  return execa(pkgManager, args, { cwd })[execParams[pkgManager].output];
};
