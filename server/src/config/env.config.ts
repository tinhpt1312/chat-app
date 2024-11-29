import { config } from 'dotenv';

config();

export const ENV = {
  DATABASE: {
    HOST: process.env.DB_HOST,
    PORT: Number(process.env.DB_PORT),
    USER: process.env.DB_USERNAME,
    PASS: process.env.DB_PASSWORD,
    DATA: process.env.DB_DATABASE,
  },
  PORT: Number(process.env.PORT),
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    COOKIE_NAME: process.env.JWT_COOKIE_NAME,
  },
};
