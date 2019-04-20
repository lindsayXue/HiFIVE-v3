const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const TeamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  member: {
    type: Number,
    default: 0
  },
  points: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = Team = mongoose.model('teams', TeamSchema)
