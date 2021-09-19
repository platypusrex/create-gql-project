import { prompt } from 'enquirer';
import chalk from 'chalk';
import { Template } from '../types';

export const selectTemplate = async (): Promise<Template> => {
  try {
    const response = await prompt<{ template: Template }>({
      type: 'select',
      name: 'template',
      message: 'Select a template:',
      choices: ['apollo-typegraphql', 'apollo-typegraphql-auth', 'next-giraphql-prisma-nextauth'],
    });

    return response.template;
  } catch (e) {
    console.log();
    console.log(`%s Project creation cancelled`, chalk.green('DONE'));
    process.exit(1);
  }
};
