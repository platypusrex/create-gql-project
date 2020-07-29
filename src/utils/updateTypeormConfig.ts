import path from 'path';
import { readJsonSync, writeJSONSync } from 'fs-extra';

export interface UpdateTypeormConfigOptions {
  database: string;
  username: string;
  password: string;
}

export const updateTypeormConfig = (
  projectDirectory: string,
  { database, username, password }: UpdateTypeormConfigOptions
): void => {
  try {
    const ormConfigPath = path.join(process.cwd(), projectDirectory, 'ormconfig.json');
    const ormConfigJson = readJsonSync(ormConfigPath);
    ormConfigJson.database = database;
    ormConfigJson.username = username;
    ormConfigJson.password = password;
    writeJSONSync(ormConfigPath, ormConfigJson, { spaces: 2 });
  } catch (e) {
    throw new Error('Failed to update ormconfig.json');
  }
};
