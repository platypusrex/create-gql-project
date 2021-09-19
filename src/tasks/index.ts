import { Listr, ListrBaseClassOptions } from 'listr2';
import { copyProjectFilesTask } from './copyProjectFilesTask';
import { createDatabaseTask } from './createDatabaseTask';
import { installDependenciesTask } from './installDependenciesTask';
import { ListrContext, Template } from '../types';
import { initializePrismaTask } from './initializePrismaTask';

const listrOptions: ListrBaseClassOptions = {
  concurrent: false,
  rendererOptions: { collapseSkips: false },
};

export const tasks: Record<Template, Listr<ListrContext>> = {
  [Template['apollo-typegraphql']]: new Listr(
    [copyProjectFilesTask, installDependenciesTask],
    listrOptions
  ),
  [Template['apollo-typegraphql-auth']]: new Listr(
    [copyProjectFilesTask, createDatabaseTask, installDependenciesTask],
    listrOptions
  ),
  [Template['next-giraphql-prisma-nextauth']]: new Listr(
    [copyProjectFilesTask, installDependenciesTask, initializePrismaTask],
    listrOptions
  ),
};
