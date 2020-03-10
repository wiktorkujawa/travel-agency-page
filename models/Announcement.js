const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AnnouncementSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Announcement = mongoose.model('announcement', AnnouncementSchema);