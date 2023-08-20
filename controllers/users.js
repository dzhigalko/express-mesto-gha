const User = require('../models/user');
const { NotFoundError } = require('../utils/errors');
const constants = require('../utils/constants');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(constants.HTTP_CREATED).send(user);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => new NotFoundError('User not found'))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const updateCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, { runValidators: true, new: true })
    .orFail(() => new NotFoundError('User not found'))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const updateCurrentUserAvatar = (req, res, next) => {
  const { _id: userId } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, { runValidators: true, new: true })
    .orFail(() => new NotFoundError('User not found'))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateCurrentUser,
  updateCurrentUserAvatar,
};
