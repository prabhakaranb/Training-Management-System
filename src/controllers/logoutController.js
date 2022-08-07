const User = require('../lib/models/userModel');

const manageLogout = async (req, res) => {
  // On client, also delete the accessToken

  const accessToken = (req?.headers?.authorization)
    ? req.headers.authorization.replace('Bearer ', '')
    : undefined;

  if (!accessToken) {
    return {}; // No content
  }

  // Is accessToken in db?
  const foundUser = await User.findOne({
    accessToken,
  }).exec();

  if (!foundUser) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      // secure: true
    });
    return {};
  }

  foundUser.accessToken = '';
  foundUser.refreshToken = '';
  const result = await foundUser.save();

  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    // secure: true
  });
  return {};
};

module.exports = {
  manageLogout,
};
