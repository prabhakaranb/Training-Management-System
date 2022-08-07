const bcrypt = require('bcrypt');
const User = require('../lib/models/userModel');
const {
  BadRequestError,
  NotFoundError,
} = require('../lib/common/errors');
const {
  generateTemporaryPassword,
  getEncryptedPassword,
} = require('../lib/helpers');

const getUserInfo = async (req) => {
  const {
    username,
  } = req.params;

  const foundUser = await User.findOne({
    username,
  })
    .exec();

  if (!foundUser) {
    throw new NotFoundError('User not found.');
  }

  return {
    data: {
      id: foundUser.id,
      firstName: foundUser.firstname || '',
      lastName: foundUser.lastname || '',
      emailId: foundUser.email || '',
      phoneNumber: foundUser.phone || '',
    },
  };
};

const updateUserInfo = async (req) => {
  const {
    firstName,
    lastName,
    emailId,
    phoneNumber,
  } = req.body;
  const {
    id,
  } = req.params;

  const foundUser = await User.findById(id)
    .exec();

  if (!foundUser) {
    throw new NotFoundError('User not found.');
  }

  foundUser.firstname = firstName;
  foundUser.lastname = lastName;
  foundUser.email = emailId;
  foundUser.phone = phoneNumber;
  await foundUser.save();

  return {
    data: {
      message: `User ${foundUser.username} updated successfully!!!`,
    },
  };
};

const getTemporaryPassword = async (req) => {
  const {
    emailId,
  } = req.body;
  const {
    username,
  } = req.params;

  const foundUser = await User.findOne({
    username,
    emailId,
  })
    .exec();

  if (!foundUser) {
    throw new NotFoundError('User not found.');
  }

  const password = generateTemporaryPassword();
  const hashedPwd = await getEncryptedPassword(password);

  foundUser.password = hashedPwd;
  await foundUser.save();

  return {
    data: {
      message: 'Password updated successfully!!!',
      // TODO : Send temp password to verified user email
      password,
    },
  };
};

const updateProfilePassword = async (req) => {
  const {
    emailId,
    oldPassword,
    password,
  } = req.body;
  const {
    username,
  } = req.params;

  const foundUser = await User.findOne({
    username,
    emailId,
  })
    .exec();

  if (!foundUser) {
    throw new NotFoundError('User not found.');
  }

  const passwordIsValid = bcrypt.compareSync(oldPassword, foundUser.password);
  if (!passwordIsValid) {
    throw new BadRequestError('Your old password not matched.');
  }

  const hashedPwd = await getEncryptedPassword(password);

  foundUser.password = hashedPwd;
  await foundUser.save();

  return {
    data: {
      message: 'Password updated successfully!!!',
    },
  };
};

module.exports = {
  getTemporaryPassword,
  getUserInfo,
  updateUserInfo,
  updateProfilePassword,
};
