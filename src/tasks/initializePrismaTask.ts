import { ListrTask } from 'listr2';
import { ListrContext } from '../types';
import { initPrismaMigration } from '../utils/initPrismaMigration';

const subTaskOptions = {
  concurrent: false,
  rendererOptions: { collapse: true },
};

export const initializePrismaTask: ListrTask<ListrContext> = {
  title: 'Running prisma initialization tasks',
  task: (_, task) =>
    task.newListr(
      [
        {
          title: 'Run initial migration',
          task: async ({ projectDirectory: cwd }) => initPrismaMigration(cwd),
          options: { persistentOutput: true, bottomBar: true },
        },
      ],
      subTaskOptions
    ),
};
