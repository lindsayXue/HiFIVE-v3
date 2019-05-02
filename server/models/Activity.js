const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ActivitySchema = new Schema({
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  participants: {
    type: Number,
    default: 0
  },
  points: {
    type: Number,
    default: 0
  },
  state: {
    type: String,
    default: 'running'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = Activity = mongoose.model('activity', ActivitySchema)
