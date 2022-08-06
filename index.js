const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const { service } = require('./config');
const { AppError, NotFoundError } = require('./src/lib/common/errors');
const logger = require('./src/lib/common/logger');
const routes = require('./src/routes');

const { env, name, port } = service;

require('./src/lib/clients');

// error handler
const errorHandler = (err) => {
  if (err instanceof AppError || err.statusCode >= 500) {
    // TODO: Send alerts in email/WA ect
    logger.error(`Error occured: ${JSON.stringify(err)}`);
  }
};

const app = express();

app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms '
    + ':res[content-length] ":referrer" ":user-agent"'));
app.use(compression());
app.use(express.json());
app.use(cookieParser());

app.use('/', routes);

// handle 404
app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use((err, req, res, next) => {
  errorHandler(err);
  res.status(err.statusCode || 500).json({
    error: {
      code: err instanceof AppError ? err.code : 9999,
      message: err instanceof AppError ? err.message : 'Unexpected error.',
      detail: err instanceof AppError ? err.detail : err.message,
    },
  });
});

app.listen(port, () => console.log(`${name} [${env}] listening on port ${port}!`));

process.on('uncaughtException', errorHandler);
process.on('unhandledRejection', errorHandler);
