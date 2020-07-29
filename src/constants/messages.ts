import chalk from 'chalk';
import figlet from 'figlet';
import { resolve } from 'path';

export const cliBanner = (): void => {
  console.log(chalk.blueBright(figlet.textSync('create-gql-project', { font: 'Small' })));
  console.log();
};

export const missingYarnInstall = `Yarn is not available, install it via ${chalk.green(
  'npm install -g yarn'
)}`;

export const missingPostgressInstall = `Postgres is not available, install it via ${chalk.green(
  'homebrew install postgres'
)}`;

export const projectReady = (projectDirectory: string): void => {
  console.log();
  console.log(
    `%s Project create in ${chalk.blue(resolve(process.cwd(), projectDirectory))}`,
    chalk.green('DONE')
  );
};
