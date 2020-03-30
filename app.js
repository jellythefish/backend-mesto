const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const router = require('./routes');
const { logger, errorMiddleware, auth } = require('./middlewares');
const { login, createUser } = require('./controllers/users');

const { PORT, DATABASE } = require('./config');

// launching web-server
const app = express();
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// connecting to database
mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// adding middlewares
app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// adding routes
app.post('/signin', login);
app.post('/signup', createUser);
app.use('/users', auth, router.users);
app.use('/cards', auth, router.cards);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден!' });
});
app.use(errorMiddleware);