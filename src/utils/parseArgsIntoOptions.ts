import { Options, Template } from '../types';

interface ParsedArgs {
  g: boolean;
  n: boolean;
}

export const parseArgsIntoOptions = async (
  projectDirectory: string,
  { g, n }: ParsedArgs
): Promise<Options> => ({
  projectDirectory,
  template: Template['apollo-typegraphql'],
  git: g,
  pkgManager: n ? 'npm' : 'yarn',
});
