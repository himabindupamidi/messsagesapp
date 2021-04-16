export const {
  PORT = 5000,
  NODE_ENV = 'development',
  SESS_NAME = 'user',
  SESS_SECRET = 'verzuscom',
  SESS_LIFETIME = 1000 * 60 * 60 * 1,
} = process.env;
