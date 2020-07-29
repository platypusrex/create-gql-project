import { removeSync } from 'fs-extra';
import { resolve } from 'path';

export const removeProjectDirectory = (projectDirectory: string): void => {
  try {
    const projectPath = resolve(process.cwd(), projectDirectory);
    removeSync(projectPath);
  } catch (e) {
    throw e;
  }
};
