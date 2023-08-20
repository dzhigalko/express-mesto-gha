const User = require('../models/user');
const { NotFoundError } = require('../utils/errors');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }

      res.send(user);
    })
    .catch(next);
};

const updateCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }

      res.send(user);
    })
    .catch(next);
};

const updateCurrentUserAvatar = (req, res, next) => {
  const { _id: userId } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }

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
