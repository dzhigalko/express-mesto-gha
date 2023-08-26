const express = require('express');
const mongoose = require('mongoose');
const { errors: celebrateErrors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const constants = require('./utils/constants');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');

const {
  PORT = 3000,
  DB_URL = 'mongodb://localhost:27017/mestodb',
  JWT_SECRET_KEY = 'jwt-super-secret-key',
  JWT_TTL = '7d',
} = process.env;

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.jwtSecret = JWT_SECRET_KEY;
  req.jwtTTL = JWT_TTL;
  next();
});

app.post('/signin', ...login);
app.post('/signup', ...createUser);
app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.use(celebrateErrors());
app.use(errors);

app.use((req, res) => {
  res.status(constants.HTTP_NOT_FOUND).send({ message: `Path ${req.path} not found` });
});

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
