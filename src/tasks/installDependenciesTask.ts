import chalk from 'chalk';
import { ListrBaseClassOptions, ListrTask } from 'listr2';
import { ListrContext, Template } from '../types';
import { canUseYarn, installDependencies } from '../utils';
import { dependencies, missingYarnInstall } from '../constants';

const taskOptions: ListrBaseClassOptions = {
  concurrent: false,
  rendererOptions: { collapse: true },
};

export const installDependenciesTask: ListrTask<ListrContext> = {
  title: `Install dependencies (${chalk.cyan('this might take a minute')})`,
  task: (_, task) =>
    task.newListr(
      [
        {
          title: 'Verifying yarn install...',
          task: (ctx, task) => {
            ctx.pkgManager = canUseYarn() ? 'yarn' : 'npm';
            task.title = `Setting ${chalk.cyan(ctx.pkgManager)} as package installer....`;
            if (ctx.pkgManager === 'npm') {
              task.skip(missingYarnInstall);
            }
          },
          enabled: ({ pkgManager }) => pkgManager === 'yarn',
          options: { persistentOutput: true },
        },
        {
          task: ({ pkgManager }, task) => {
            task.title = `Installing dependencies with ${chalk.cyan(pkgManager)}...`;
            return task.newListr(
              [
                {
                  title: 'Installing dependencies...',
                  task: async ({ pkgManager, template, projectDirectory }) =>
                    installDependencies({
                      pkgManager,
                      projectDirectory,
                      deps: dependencies[template as Template].deps,
                    }),
                  options: { persistentOutput: true, bottomBar: true },
                },
                {
                  title: 'Installing dev dependencies...',
                  task: async ({ pkgManager, template, projectDirectory }) =>
                    installDependencies({
                      pkgManager,
                      projectDirectory,
                      deps: dependencies[template as Template].devDeps,
                      saveDev: true,
                    }),
                  options: { persistentOutput: true, bottomBar: true },
                },
              ],
              { concurrent: false }
            );
          },
        },
      ],
      taskOptions
    ),
};
