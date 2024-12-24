export const ACCESS_TOKEN_COOKIE = 'chat-access-token';

export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/;

export const ACCESS_TOKEN_NAME = 'chat-access-token';

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,
  expires: new Date(Date.now() + 1000 * 2505600),
};
