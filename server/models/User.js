const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  googleId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true // Not sure whether it is required
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
  jobDesc: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 0
  },
  hifive: {
    type: Number,
    default: 0
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'teams',
    required: true
  },
  teamRandom: {
    type: Boolean,
    default: true
  },
  accountState: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('users', UserSchema)
