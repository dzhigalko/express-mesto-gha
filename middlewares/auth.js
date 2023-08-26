const jwt = require('jsonwebtoken');
const constants = require('../utils/constants');

module.exports = (req, res, next) => {
  const { jwtSecret } = req;
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(constants.HTTP_UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    return res
      .status(constants.HTTP_UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  return next();
};
