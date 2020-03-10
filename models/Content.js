const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ContentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Content = mongoose.model('content', ContentSchema);