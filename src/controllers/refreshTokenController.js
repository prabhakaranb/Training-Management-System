const jwt = require('jsonwebtoken');
const User = require('../lib/models/userModel');

const config = require('../../config');

const {
  ForbiddenError,
  UnauthorizedError,
} = require('../lib/common/errors');

const manageRefreshToken = async (req, res) => {
  const refreshToken = (req?.headers?.authorization)
    ? req.headers.authorization.replace('Bearer ', '')
    : undefined;

  if (!refreshToken) {
    throw new UnauthorizedError('Invalid token.');
  }

  const foundUser = await User.findOne({
    refreshToken,
  }).exec();

  if (!foundUser) {
    throw new ForbiddenError('User not found.'); // Forbidden
  }

  // evaluate jwt
  jwt.verify(
    refreshToken,
    config.jwt.refreshTokenSecret,
    (err, decoded) => {
      if (err || foundUser.username !== decoded.username) {
        throw new ForbiddenError('User not found.'); // Forbidden
      }
      const accessToken = jwt.sign(
        {
          userInfo: {
            id: foundUser.id,
            name: decoded.username,
            role: foundUser.role,
          },
        },
        config.jwt.accessTokenSecret,
        {
          expiresIn: config.jwt.accessTokenExpiresIn,
        },
      );
      return {
        data: {
          accessToken,
        },
      };
    },
  );
};

module.exports = {
  manageRefreshToken,
};
