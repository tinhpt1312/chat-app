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
