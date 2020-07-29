import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { promisify } from 'util';
import { Template } from '../types';

const access = promisify(fs.access);

export const getTemplatesDirectory = async (template: Template): Promise<string> => {
  const templateDir = path.resolve(__dirname, '../../templates', template);

  try {
    await access(templateDir, fs.constants.R_OK);
    return templateDir;
  } catch (e) {
    console.error(`%s Invalid template name. ${e.message}`, chalk.red.bold('Error'));
    process.exit(1);
  }
};
