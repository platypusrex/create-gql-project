import path from 'path';
import { readJsonSync, writeJSONSync } from 'fs-extra';

export const updatePackageJson = (projectDirectory: string): void => {
  try {
    const packageJsonPath = path.join(process.cwd(), projectDirectory, 'package.json');
    const packageJson = readJsonSync(packageJsonPath);
    packageJson.name = projectDirectory;
    writeJSONSync(packageJsonPath, packageJson, { spaces: 2 });
  } catch (e) {
    throw new Error('Failed to update package.json');
  }
};
