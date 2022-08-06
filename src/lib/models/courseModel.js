const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;

const courseSchema = new Schema({
  courseName: {
    type: String,
    required: true,
  },
  subjects: {
    type: [String],
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.ObjectId,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Course', courseSchema);
