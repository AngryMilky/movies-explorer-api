const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const NotFoundError = require('./errors/not-found-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const limiter = require('./utils/rateLimiter');
const { PORT, MONGO_LINK } = require('./utils/envConfig');

mongoose.connect(MONGO_LINK, {
  useNewUrlParser: true,
});

const app = express();

app.use(cors);

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.use(requestLogger); // подключаем логгер запросов

app.use(limiter);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => {
  console.log(`${PORT}`);
});
