const jwt = require('jsonwebtoken');
const config = require('../../config');
const {
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
} = require('../lib/common/errors');

const verifyAuthToken = (req, res, next) => {
  const acccessToken = (req?.headers?.authorization)
    ? req.headers.authorization.replace('Bearer ', '')
    : undefined;

  if (!acccessToken) {
    throw new UnauthorizedError('Invalid token.');
  }

  req.acccessToken = acccessToken;

  // evaluate jwt
  jwt.verify(
    acccessToken,
    config.jwt.accessTokenSecret,
    (err, decoded) => {
      if (err) {
        throw new ForbiddenError(err.message); // Forbidden
      }

      req.payload = decoded;
      next();
    },
  );
};

const verifyUser = (req, res, next) => {
  const { id, username } = req.params;

  if (id && id !== req?.payload?.userInfo?.id) {
    throw new ForbiddenError('Not allowed to get this user info.');
  } else if (username && username !== req?.payload?.userInfo?.name) {
    throw new ForbiddenError('Not allowed to get this user info.');
  }

  next();
};

const getJoiErrorDetailsMessages = (joiError) => joiError.details.map((detail) => detail.message).join('. ');

const validateParam = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.params);
  if (error) {
    return next(new BadRequestError(getJoiErrorDetailsMessages(error)));
  }
  req.params = value;
  return next();
};

const validateQuery = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.query);
  if (error) {
    return next(new BadRequestError(getJoiErrorDetailsMessages(error)));
  }
  req.query = value;
  return next();
};

const validateBody = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { allowUnknown: true });
  if (error) {
    return next(new BadRequestError(getJoiErrorDetailsMessages(error)));
  }
  req.body = value;
  return next();
};

const verifyRoles = (...allowedRoles) => (req, res, next) => {
  const { userInfo } = req.payload;

  if (!userInfo?.role) {
    return next(new UnauthorizedError());
  }
  const rolesArray = [...allowedRoles];
  const result = rolesArray.includes(userInfo.role);
  if (!result) {
    return next(new UnauthorizedError());
  }
  next();
};

module.exports = {
  validateBody,
  validateParam,
  validateQuery,
  verifyAuthToken,
  verifyRoles,
  verifyUser,
};
