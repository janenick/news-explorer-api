const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
require('dotenv').config();
const { MONGODB, PORT, allowedCors } = require('./config');
const { limiter } = require('./middlewares/rateLimiter');
const celebrateErrorHandler = require('./middlewares/celebrateValidation/celebrateErrorHandler');
const errorHandler = require('./middlewares/errorHandler');
const { serverErrorMessage } = require('./utils/errorsMessages');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// подключаемся к серверу mongo
mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const router = require('./routes');

const app = express();

app.use(cors({
  origin: allowedCors,
}));

// подключаем логгер запросов (его нужно подключить до всех обработчиков роутов)
app.use(requestLogger);

app.use(limiter); // rate-limiter для ограничения количество запросов с одного IP-адреса/ед. времени
app.use(helmet()); // для простановки security-заголовков для API

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(serverErrorMessage.serverFallError);
  }, 0);
});

app.use('/', router);

app.use(errorLogger); // логгер ошибок (после обработчиков роутов и до обработчиков ошибок)
// app.use(errors()); // стандартный обработчик ошибок celebrate
app.use(celebrateErrorHandler); // обработчик ошибок celebrate

app.use(errorHandler);

app.listen(PORT);
