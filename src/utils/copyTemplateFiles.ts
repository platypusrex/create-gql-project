import { copy } from 'fs-extra';

export const copyTemplateFiles = async (
  templateDirectory: string,
  projectDirectory: string
): Promise<void> => {
  try {
    await copy(templateDirectory, projectDirectory, { overwrite: false });
  } catch (e) {
    throw new Error('Failed to copy project template.');
  }
};
