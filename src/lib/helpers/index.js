const isEmptyArray = (array) => !Array.isArray(array) || array.length === 0;

const isEmptyObject = (param) => param === null || param === undefined || param === '' || Object.keys(param).length === 0;

module.exports = {
  isEmptyArray,
  isEmptyObject,
};
