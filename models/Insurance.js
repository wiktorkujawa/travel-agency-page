const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const InsuranceSchema = new Schema({
  files_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Insurance = mongoose.model('insurance', InsuranceSchema);