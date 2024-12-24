import { Request } from 'express';

export interface ITokenPayload {
  id: string;
  provider?: string;
}

export interface IRequestWithPayload extends Request {
  user: ITokenPayload;
}

export enum UserProvider {
  LOCAL = 'LOCAL',
  GOOGLE = 'GOOGLE',
}

export interface GoogleProfile {
  username: string;
  email: string;
  avatar: string;
  provider: string;
}

export enum UserCodeType {
  REGISTER = 'REGISTER',
  RESET_PASSWORD = 'RESET_PASSWORD',
}

export const UserCodeExpiration = {
  [UserCodeType.REGISTER]: 1000 * 60 * 60 * 24,
  [UserCodeType.RESET_PASSWORD]: 1000 * 60 * 60 * 24,
};

export enum USER_RESPONSE {
  EXISTS_CODE = 301,
  EXISTS_MESSAGE = 'Email is already use',

  CREATED_SUCCESS = 302,
  CREATED_MESSAGE = 'Created user is successfully',

  NOT_EXIST_CODE = 303,
  NOT_EXIST_MESSAGE = 'User with Email does not exist',

  INVALID_CODE = 304,
  INVALID_MESSAGE = 'Password is incorrect, please log in again.',

  EMAIL_NOT_VERIFIED_CODE = 305,
  EMAIL_NOT_VERIFIED_MESSAGE = 'Please verify your email before login',

  LOGIN_SUCCESS_CODE = 306,
  LOGIN_SUCCESS_MESSAGE = 'Login successfully',

  GOOGLE_EXISTS_CODE = 307,
  GOOGLE_EXISTS_MESSAGE = 'Can not access your google account',

  GOOGLE_LOGIN_FAIL_CODE = 308,
  GOOGLE_LOGIN_FAIL_MESSAGE = 'Failed to login by google',
}
