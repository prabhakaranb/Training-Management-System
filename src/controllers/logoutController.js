const User = require('../lib/models/userModel');

const manageLogout = async (req, res) => {
  // On client, also delete the accessToken

  const refreshToken = (req?.headers?.authorization)
    ? req.headers.authorization.replace('Bearer ', '')
    : undefined;

  if (!refreshToken) {
    return {}; // No conten
  }

  // Is refreshToken in db?
  const foundUser = await User.findOne({
    refreshToken,
  }).exec();

  if (!foundUser) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      // secure: true
    });
    return {};
  }

  // Delete refreshToken in db
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
