import { Listr, ListrBaseClassOptions } from 'listr2';
import { copyProjectFilesTask } from './copyProjectFilesTask';
import { createDatabaseTask } from './createDatabaseTask';
import { installDependenciesTask } from './installDependenciesTask';
import { ListrContext, Template } from '../types';

const listrOptions: ListrBaseClassOptions = {
  concurrent: false,
  rendererOptions: { collapseSkips: false },
};

export const tasks: Record<Template, Listr<ListrContext>> = {
  [Template.basic]: new Listr([copyProjectFilesTask, installDependenciesTask], listrOptions),
  [Template.withAuthentication]: new Listr(
    [copyProjectFilesTask, createDatabaseTask, installDependenciesTask],
    listrOptions
  ),
};
