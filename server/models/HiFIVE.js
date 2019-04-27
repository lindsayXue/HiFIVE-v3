const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const HiFIVESchema = new Schema({
  sender: {
    type: String,
    ref: 'users',
    required: true
  },
  receiver: [
    {
      type: String,
      ref: 'users',
      required: true
    }
  ],
  reason: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = HiFIVE = mongoose.model('hifives', HiFIVESchema)
