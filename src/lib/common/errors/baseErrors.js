/* eslint-disable max-classes-per-file */
class AppError extends Error {
  constructor(detail) {
    super();
    this.detail = detail;
  }
}

class BadRequestError extends AppError {
  constructor(detail) {
    super(detail);
    this.code = 40001;
    this.statusCode = 400;
    this.message = 'Bad request.';
  }
}
class UnauthorizedError extends AppError {
  constructor(detail) {
    super(detail);
    this.code = 40101;
    this.statusCode = 401;
    this.message = 'Unauthorized.';
  }
}
class NotFoundError extends AppError {
  constructor(detail) {
    super(detail);
    this.code = 40401;
    this.statusCode = 404;
    this.message = 'Not found.';
  }
}
class InternalServerError extends AppError {
  constructor(detail) {
    super(detail);
    this.code = 50001;
    this.statusCode = 500;
    this.message = 'Internal server error.';
  }
}

class ServiceUnavailableError extends AppError {
  constructor(detail) {
    super(detail);
    this.statusCode = 503;
    this.code = 50301;
    this.message = 'Service unavailable.';
  }
}

class ConflictError extends AppError {
  constructor(detail) {
    super(detail);
    this.statusCode = 409;
    this.code = 40901;
    this.message = 'Conflict.';
  }
}

class ForbiddenError extends AppError {
  constructor(detail) {
    super(detail);
    this.statusCode = 403;
    this.code = 40301;
    this.message = 'Forbidden.';
  }
}

module.exports = {
  AppError,
  BadRequestError,
  ConflictError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  ServiceUnavailableError,
  UnauthorizedError,
};
