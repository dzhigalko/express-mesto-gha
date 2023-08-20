const Card = require('../models/card');
const { NotFoundError } = require('../utils/errors');
const constants = require('../utils/constants');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id: userId } = req.user;

  Card.create({ name, link, owner: userId })
    .then((card) => {
      res.status(constants.HTTP_CREATED).send(card);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(() => new NotFoundError('Card not found'))
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

const addCardLike = (req, res, next) => {
  const { cardId } = req.params;
  const { _id: userId } = req.user;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => new NotFoundError('Card not found'))
    .then((card) => {
      res.send(card);
    }).catch(next);
};

const deleteCardLike = (req, res, next) => {
  const { cardId } = req.params;
  const { _id: userId } = req.user;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => new NotFoundError('Card not found'))
    .then((card) => {
      res.send(card);
    }).catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  deleteCardLike,
};
