import { Listr, ListrBaseClassOptions } from 'listr2';
import { copyProjectFilesTask } from './copyProjectFilesTask';
import { installDependenciesTask } from './installDependenciesTask';
import { ListrContext, Template } from '../types';
import { createDatabaseTask } from './createDatabaseTask';

const listrOptions: ListrBaseClassOptions = {
  concurrent: false,
  rendererOptions: { collapseSkips: false },
};

export const tasks: Record<Template, Listr<ListrContext>> = {
  [Template.withAuthentication]: new Listr(
    [copyProjectFilesTask, createDatabaseTask, installDependenciesTask],
    listrOptions
  ),
};
