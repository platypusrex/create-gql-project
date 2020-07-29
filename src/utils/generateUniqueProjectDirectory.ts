import fs from 'fs-extra';
import chalk from 'chalk';
import { prompt } from 'enquirer';
import { generateSafePackageName } from './generateSafePackageName';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateUniqueProjectDirectory = async (projectDirectory: string): Promise<any> => {
  const realPath = await fs.realpath(process.cwd());
  const targetDirectory = await fs.pathExists(`${realPath}/${projectDirectory}`);

  if (!targetDirectory) {
    return generateSafePackageName(projectDirectory);
  }

  try {
    const response = await prompt<{ projectDirectory: string }>({
      type: 'input',
      message: `Project directory ${chalk.bold.red(projectDirectory)} already exists. ${chalk.bold(
        'Please select a different name'
      )}`,
      name: 'projectDirectory',
      initial: projectDirectory + '-1',
      result: (val) => val.trim(),
    });

    if (response) {
      return await generateUniqueProjectDirectory(response.projectDirectory);
    }
  } catch (e) {
    console.log();
    console.log(`%s Project creation cancelled`, chalk.green('DONE'));
    process.exit(1);
  }
};
