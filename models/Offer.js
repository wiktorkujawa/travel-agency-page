const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const OfferSchema = new Schema({
  files_id: {
    type: Schema.Types.ObjectId
  },
  image: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  arrivalDate: {
    type: Date,
    required: true
  },
  arrivalTime: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  tripLocation: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Offer = mongoose.model('offer', OfferSchema);