import dotenv from 'dotenv';

dotenv.config();

export const sessionName = process.env.SESSION_NAME || '';
export const sessionSecret = process.env.SESSION_SECRET || '';
export const allowedOrigins = process.env.ALLOWED_ORIGINS || '';
