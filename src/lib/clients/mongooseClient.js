const mongoose = require('mongoose');
const config = require('../../../config');

const mongooseDb = mongoose.connect(config.mongoDb.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`Failed to connect MongoDD - ${err.stack}`);
});

module.exports = mongooseDb;
