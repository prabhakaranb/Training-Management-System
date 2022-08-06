const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;

const subjectSchema = new Schema({
  subjectName: {
    type: String,
    required: true,
  },
  streamName: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.ObjectId,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Subject', subjectSchema);
