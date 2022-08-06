const Course = require('../lib/models/courseModel');
const {
  ConflictError,
} = require('../lib/common/errors');

const addNewCourse = async (req) => {
  const {
    courseName,
    subjects,
    type,
  } = req.body;
  const {
    userInfo,
  } = req.payload;

  // check for duplicate Course in the db
  const duplicate = await Course.findOne({
    courseName,
  }).exec();

  if (duplicate) {
    throw new ConflictError(`Course (${courseName}) already exists.`);
  }

  await Course.create({
    courseName,
    subjects,
    type,
    userId: userInfo?.id,
  });

  return {
    data: 'Course addeded successfully!',
  };
};

const getCourses = async (req) => {
  const page = Number(req.query.page) || 0;
  const limit = Number(req.query.size) || 10;
  const sort = req.query.sort || 'desc';

  const filterQuery = {
    subjects: 'maths',
    // type: 'Basic',
  };

  const courses = await Course
    .find(filterQuery)
    .collation({
      locale: 'en',
      strength: 2,
    })
    .sort({
      courseName: sort,
    })
    .skip(page * limit)
    .limit(limit);

  const count = await Course.countDocuments({});

  return {
    data: {
      page,
      size: limit,
      total: count,
      courses: courses.map((course) => ({
        id: course.id,
        courseName: course.courseName,
        subjects: course.subjects,
        type: course.type,
        userId: course.userId,
      })),
    },
  };
};

const getCourse = async (req) => {

};

module.exports = {
  addNewCourse,
  getCourse,
  getCourses,
};
