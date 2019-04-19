const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  ageRange: {
    type: String,
    required: true
  },
  fitnessLevel: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    defaultValue: 0
  },
  hiFive: {
    type: Number,
    defaultValue: 0
  },
  teamRandom: {
    type: Boolean,
    defaultValue: true
  },
  accountState: {
    type: Boolean,
    defaultValue: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)
