const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;

const streamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.ObjectId,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Stream', streamSchema);
