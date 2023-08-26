const mongoose = require('mongoose');
const constants = require('../utils/constants');
const NotFoundError = require('../utils/NotFoundError');

module.exports = (err, req, res, _) => {
  if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
    res.status(constants.HTTP_BAD_REQUEST).send({ message: err.message });
  } else if (err.name === 'MongoServerError' && err.code === 11000) {
    res.status(constants.HTTP_CONFLICT).send({ message: err.message });
  } else if (err instanceof NotFoundError) {
    res.status(constants.HTTP_NOT_FOUND).send({ message: err.message });
  } else {
    res.status(constants.HTTP_SERVER_ERROR).send({ message: 'Something went wrong' });
  }
};