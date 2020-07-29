import { ListrTask } from 'listr2';
import { ListrContext } from '../types';
import { copyTemplateFiles, updatePackageJson } from '../utils';

const subTaskOptions = {
  concurrent: false,
  rendererOptions: { collapse: true },
};

export const copyProjectFilesTask: ListrTask<ListrContext> = {
  title: 'Copy project files',
  task: (_, task) =>
    task.newListr(
      [
        {
          title: 'Copying files...',
          task: async ({ templateDirectory, projectDirectory }) =>
            await copyTemplateFiles(templateDirectory, projectDirectory),
        },
        {
          title: 'Writing to package.json...',
          task: ({ projectDirectory }) => updatePackageJson(projectDirectory),
        },
      ],
      subTaskOptions
    ),
};
