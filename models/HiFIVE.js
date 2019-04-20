const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const HiFIVESchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
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
