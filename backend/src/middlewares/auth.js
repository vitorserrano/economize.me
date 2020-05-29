const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const authorization = require('../config/configToken');

module.exports = async (request, response, next) => {
  try {
    const autHeader = request.headers.authorization;

    if (!autHeader) {
      return response.status(401).json({
        error: 'Token not provided',
      });
    }

    const [, token] = autHeader.split(' ');

    const decoded = await promisify(jwt.verify)(token, authorization.secret);
    request.userId = decoded.id;

    return next();
  } catch (error) {
    return response.status(401).json({
      error: error.message,
    });
  }
};
