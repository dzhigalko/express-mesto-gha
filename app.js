const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { NotFoundError } = require('./utils/errors');

const {
  PORT = 8080,
  DB_URL = 'mongodb://localhost:27017/mestodb',
  DB_USER = 'admin',
  DB_PASSWORD = 'admin',
  CURRENT_USER_ID = '64e21cd2e71c44d866f1fa26',
} = process.env;

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: CURRENT_USER_ID,
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((err, req, res, _) => {
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).send(err.errors);
  } else if (err instanceof NotFoundError) {
    res.status(404).send({ message: err.message });
  } else {
    res.status(500).send({ message: 'Something went wrong' });
  }
});

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  authSource: 'admin',
  user: DB_USER,
  pass: DB_PASSWORD,
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
