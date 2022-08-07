const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../../config');
const User = require('../lib/models/userModel');
const {
  BadRequestError,
  UnauthorizedError,
} = require('../lib/common/errors');

const manageUserLogin = async (req, res) => {
  const {
    username,
    password,
  } = req.body;
  if (!username || !password) {
    throw new BadRequestError('Username and password are required.');
  }

  const foundUser = await User.findOne({
    username,
  }).exec();

  if (!foundUser) {
    throw new UnauthorizedError('Login not allowed.');
  }
  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    // create JWTs
    const accessToken = jwt.sign(
      {
        userInfo: {
          id: foundUser.id,
          name: foundUser.username,
          role: foundUser.role,
        },
      },
      config.jwt.accessTokenSecret,
      {
        expiresIn: config.jwt.accessTokenExpiresIn,
      },
    );

    const refreshToken = jwt.sign(
      {
        username: foundUser.username,
      },
      config.jwt.refreshTokenSecret,

      {
        expiresIn: config.jwt.refreshTokenExpiresIn,
      },
    );

    // Saving accessToken with current user
    foundUser.accessToken = accessToken;
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    // Creates Secure Cookie with refresh token
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      // secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send authorization access token to user
    return {
      data: {
        accessToken,
      },
    };
  }
  throw new UnauthorizedError('Login not allowed.');
};

module.exports = {
  manageUserLogin,
};
