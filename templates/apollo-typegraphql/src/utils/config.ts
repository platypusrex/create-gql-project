import dotenv from 'dotenv';

dotenv.config();

export const testEnv = process.env.TEXT_ENV || '';
