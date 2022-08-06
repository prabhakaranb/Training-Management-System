const { InternalServerError } = require('../lib/common/errors');

const jsonResponse = async (req, res, next, controllerMethod) => {
  try {
    const response = await controllerMethod(req, res, next);
    if (response && response.data) {
      res.status(200).json(response);
    } else if (response && response.success) {
      res.status(201).json(response);
    } else if (response && response.redirectUrl) {
      res.redirect(301, response.redirectUrl);
    } else if (response) {
      res.status(204).json(response);
    } else {
      next(new InternalServerError('Sorry, we were unable to process your request.'));
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  jsonResponse,
};
