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
  AWS: {
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    REGION: process.env.AWS_REGION,
    BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    S3_PRESIGNED_URL_EXPIRATION: process.env.AWS_S3_PRESIGNED_URL_EXPIRATION,
    S3_URL: process.env.AWS_S3_URL,
  },
  MAIL: {
    USER: process.env.MAIL_USER,
    PASS: process.env.MAIL_PASS,
    HOST: process.env.MAIL_HOST,
    PORT: process.env.MAIL_PORT,
  },
  GOOGLE: {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    CLIENT_CALLBACK_URL: process.env.GOOGLE_CLIENT_CALLBACK_URL,
  },
  URL_REDIRECT: process.env.URL_REDIRECT,
};
