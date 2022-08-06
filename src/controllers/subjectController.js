const Subject = require('../lib/models/subjectModel');
const {
  ConflictError,
} = require('../lib/common/errors');

const getSubjects = async (req) => {
  const page = Number(req.query.page) || 0;
  const limit = Number(req.query.size) || 10;
  const sort = req.query.sort || 'desc';

  const subjects = await Subject.find({})
    .sort({
      subjectName: sort,
    })
    .skip(page * limit)
    .limit(limit);

  const count = await Subject.countDocuments({});

  return {
    data: {
      page,
      size: limit,
      total: count,
      subjects: subjects.map((subject) => ({
        id: subject.id,
        subjectName: subject.subjectName,
        streamName: subject.streamName,
        userId: subject.userId,
      })),
    },
  };
};

const addNewSubject = async (req) => {
  const {
    subjectName,
    streamName,
  } = req.body;
  const {
    userInfo,
  } = req.payload;

  // check for duplicate Subject in the db
  const duplicate = await Subject.findOne({
    subjectName,
  }).exec();

  if (duplicate) {
    throw new ConflictError(`Subject (${subjectName}) already exists.`);
  }

  await Subject.create({
    subjectName,
    streamName,
    userId: userInfo?.id,
  });

  return {
    data: 'Subject addeded successfully!',
  };
};

module.exports = {
  getSubjects,
  addNewSubject,
};
