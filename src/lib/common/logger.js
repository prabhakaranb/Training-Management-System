const moment = require('moment');
const path = require('path');
const winston = require('winston');

const { service } = require('../../../config');

const dirname = path.join(__dirname, '../../../logs');
const filedate = moment().format('YYYYMMDD');

const logger = winston.createLogger({
  exitOnError: false,
  level: 'debug',
  format: winston.format.json(),
  defaultMeta: { service: service.name },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: `error_${filedate}.log`, dirname, level: 'error' }),
    new winston.transports.File({ filename: `combined_${filedate}.log`, dirname }),
  ],
});

module.exports = logger;
