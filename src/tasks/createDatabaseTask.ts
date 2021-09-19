import { ListrTask } from 'listr2';
import { ListrContext } from '../types';
import { missingPostgresInstall } from '../constants';
import {
  createPostgresDatabase,
  doesPostgresUserExist,
  isDatabaseUnique,
  isValidPostgresNaming,
  updateTypeormConfig,
  validatePostgresInstallation,
} from '../utils';

const subTaskOptions = {
  concurrent: false,
  rendererOptions: { collapse: true },
};

export const createDatabaseTask: ListrTask<ListrContext> = {
  title: 'Set up database',
  task: (_, task) =>
    task.newListr(
      [
        {
          title: 'Validating postgres installation...',
          task: async (ctx, task) => {
            ctx.isPostgresInstalled = await validatePostgresInstallation();
            if (!ctx.isPostgresInstalled) {
              task.skip(missingPostgresInstall);
            }
          },
          options: { persistentOutput: true },
        },
        {
          title: 'Updating typeorm config...',
          task: async (ctx, task) => {
            const database = await task.prompt({
              type: 'Input',
              message: 'Database name:',
              validate: async (value: string) => {
                let databaseExists;

                try {
                  databaseExists = ctx.isPostgresInstalled ? await isDatabaseUnique(value) : false;
                } catch (e) {
                  databaseExists = false;
                }

                if (!isValidPostgresNaming(value)) {
                  return 'Invalid database name.';
                }

                if (!!databaseExists) {
                  return 'Database name already in use. Please provide another name.';
                }
                return true;
              },
            });

            const username = await task.prompt({
              type: 'Input',
              message: 'Database username:',
              initial: 'admin',
              validate: async (value: string) => {
                let userExists;
                try {
                  userExists = ctx.isPostgresInstalled ? await doesPostgresUserExist(value) : false;
                } catch (e) {
                  userExists = false;
                }

                if (!isValidPostgresNaming(value)) {
                  return 'Invalid username.';
                }

                if (!!userExists) {
                  return 'Username already exists. Please provide another username.';
                }
                return true;
              },
            });

            const password = await task.prompt({
              type: 'Input',
              message: 'Database password:',
              initial: 'password',
            });

            ctx.databaseOptions = { database, username, password };
            updateTypeormConfig(ctx.projectDirectory, ctx.databaseOptions);
          },
        },
        {
          title: 'Creating postgres database...',
          task: async ({ databaseOptions }) => {
            try {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              await createPostgresDatabase(databaseOptions!);
            } catch (e) {
              task.skip('Error when trying to create database. Skipping database creation task.');
            }
          },
          skip: ({ databaseOptions, isPostgresInstalled }) =>
            !databaseOptions && !!isPostgresInstalled,
        },
      ],
      subTaskOptions
    ),
};
