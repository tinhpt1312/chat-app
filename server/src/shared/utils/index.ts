const saltRounds = 10;
import * as bcrypt from 'bcrypt';

interface IResponseParams<T> {
  statusCode?: number;
  message: string;
  data?: T;
  meta?: unknown;
}

export const IResponse = <T>({
  statusCode,
  message,
  meta,
  data,
}: IResponseParams<T>) => {
  return {
    statusCode,
    message,
    data,
    meta,
  };
};

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export { hashPassword, comparePassword };
