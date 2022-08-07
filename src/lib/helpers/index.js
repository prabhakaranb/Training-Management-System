const bcrypt = require('bcrypt');

const { BCRYPT_SALT } = require('../constants');

const isEmptyArray = (array) => !Array.isArray(array) || array.length === 0;

const isEmptyObject = (param) => param === null || param === undefined || param === '' || Object.keys(param).length === 0;

const generateTemporaryPassword = () => {
  const value = [];
  const possibleAlphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 6; i += 1) {
    value.push(possibleAlphanumeric.charAt(Math.floor(Math.random() * possibleAlphanumeric.length)));
  }

  value.push('!#$%&*'.charAt(Math.floor(Math.random() * 1)));

  return value.join('');
};

const getEncryptedPassword = (password) => bcrypt.hash(password, BCRYPT_SALT);

module.exports = {
  generateTemporaryPassword,
  getEncryptedPassword,
  isEmptyArray,
  isEmptyObject,
};
