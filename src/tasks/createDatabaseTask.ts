import { ListrTask } from 'listr2';
import { ListrContext } from '../types';
import { missingPostgressInstall } from '../constants';
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
              task.skip(missingPostgressInstall);
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
                const isDatabaseNameUnique = ctx.isPostgresInstalled
                  ? await isDatabaseUnique(value)
                  : false;
                if (!isValidPostgresNaming(value)) {
                  return 'Invalid database name.';
                }
                if (!!isDatabaseNameUnique) {
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
                const userExists = ctx.isPostgresInstalled
                  ? await doesPostgresUserExist(value)
                  : false;
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
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await createPostgresDatabase(databaseOptions!);
          },
          skip: ({ databaseOptions, isPostgresInstalled }) =>
            !databaseOptions && !!isPostgresInstalled,
        },
      ],
      subTaskOptions
    ),
};
