const User = require('../lib/models/userModel');
const {
  NotFoundError,
} = require('../lib/common/errors');

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

module.exports = {
  getUserInfo,
  updateUserInfo,
};
