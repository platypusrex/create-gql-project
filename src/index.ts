import sade from 'sade';
import { tasks } from './tasks';
import { cliBanner, projectReady } from './constants';
import {
  getTemplatesDirectory,
  generateUniqueProjectDirectory,
  parseArgsIntoOptions,
  removeProjectDirectory,
} from './utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../package.json');
const program = sade('create-gql-project <project-directory>', true);

program
  .version(packageJson.version)
  .describe('Create a new gql project')
  .example('my-svc')
  .example('gql-svc --git')
  .example('gql-svc --use-npm')
  .example('gql-svc -g -n')
  .option('-g, --git', 'Initialize git', false)
  .option('-n, --use-npm', 'Install dependencies with NPM', false)
  .action(async (name, args) => {
    cliBanner();

    const options = await parseArgsIntoOptions(name, args);
    options.projectDirectory = await generateUniqueProjectDirectory(options.projectDirectory);

    const templateDirectory = await getTemplatesDirectory(options.template);
    const extendedOptions = { ...options, templateDirectory };

    try {
      await tasks[options.template].run(extendedOptions);
      projectReady(options.projectDirectory);
    } catch (e) {
      removeProjectDirectory(options.projectDirectory);
      console.error(e);
    }
  });

program.parse(process.argv);
