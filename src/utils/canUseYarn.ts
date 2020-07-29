import { execSync } from 'child_process';

export const canUseYarn = (): boolean => {
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
};
