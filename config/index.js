require('dotenv').config();

const config = {
  service: {
    name: process.env.SERVICE_NAME || 'Programming task',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || '3000',
  },
  mongoDb: {
    uri: process.env.DATABASE_URI,
  },
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    accessTokenExpiresIn: '1d',
    refreshTokenExpiresIn: '1d',
  },
};

module.exports = config;
