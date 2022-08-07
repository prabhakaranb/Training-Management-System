const bcrypt = require('bcrypt');
const User = require('../lib/models/userModel');
const {
  BadRequestError,
  ConflictError,
  InternalServerError,
} = require('../lib/common/errors');
const {
  userConstants,
} = require('../lib/constants');
const {
  getEncryptedPassword,
} = require('../lib/helpers');

const manageNewUser = async (req, res, next) => {
  const {
    username,
    password,
    role,
  } = req.body;
  if (!username || !password) {
    throw new BadRequestError('Username and password are required.');
  }

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({
    username,
  }).exec();

  if (duplicate) {
    throw new ConflictError(`User (${username}) already exists.`); // Conflict
  }

  try {
    const hashedPwd = await getEncryptedPassword(password);

    // create and store the new user
    const result = await User.create({
      username,
      password: hashedPwd,
      role: role || userConstants.USER_ROLES.NON_ADMIN,
    });

    return {
      data: `New user ${username} created!`,
    };
  } catch (err) {
    next(new InternalServerError(err.stack));
  }
};

module.exports = {
  manageNewUser,
};
