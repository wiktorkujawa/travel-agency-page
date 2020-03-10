const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SlideSchema = new Schema({
  files_id: {
    type: Schema.Types.ObjectId
  },
  src: {
    type: String
  },
  header: {
    type: String
  },
  caption: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Slide = mongoose.model('slide', SlideSchema);