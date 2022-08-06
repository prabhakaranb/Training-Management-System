const Stream = require('../lib/models/streamModel');
const {
  ConflictError,
} = require('../lib/common/errors');

const getStreams = async (req) => {
  // check for duplicate stream in the db
  const streams = await Stream.find().exec();

  return {
    data: streams.map((stream) => ({
      id: stream.id,
      name: stream.name,
      userId: stream.userId,
    })),
  };
};

const addNewStream = async (req) => {
  const {
    name,
  } = req.body;
  const {
    userInfo,
  } = req.payload;

  // check for duplicate stream in the db
  const duplicate = await Stream.findOne({
    name,
  }).exec();

  if (duplicate) {
    throw new ConflictError(`Stream (${name}) already exists.`);
  }

  await Stream.create({
    name,
    userId: userInfo?.id,
  });

  return {
    data: 'Stream added successfully!',
  };
};

module.exports = {
  getStreams,
  addNewStream,
};
