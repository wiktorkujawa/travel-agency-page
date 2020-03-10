const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const GallerySchema = new Schema({
  files_id: {
    type: Schema.Types.ObjectId
  },
  image: {
    type: String
  },
  description: {
    type: String,
  },
  tripLocation: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Gallery = mongoose.model('photo', GallerySchema);