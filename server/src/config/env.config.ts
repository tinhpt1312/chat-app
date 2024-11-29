import { config } from 'dotenv';

config();

export const ENV = {
  DATABASE: {
    HOST: process.env.DATABASE_HOST,
    PORT: Number(process.env.DATABASE_PORT),
    USER: process.env.DATABASE_USER,
    PASS: process.env.DATABASE_PASSWORD,
    DATA: process.env.DATABASE_DATABASE,
  },
  PORT: Number(process.env.PORT),
  CORS_ORIGIN: process.env.CORS_ORIGIN,
};
