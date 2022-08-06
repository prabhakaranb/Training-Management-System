const bcrypt = require('bcrypt');
const User = require('../lib/models/userModel');
const {
  BadRequestError,
  ConflictError,
  InternalServerError,
} = require('../lib/common/errors');
const {
  userConstants,
  BCRYPT_SALT,
} = require('../lib/constants');

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
    // encrypt the password
    const hashedPwd = await bcrypt.hash(password, BCRYPT_SALT);

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
