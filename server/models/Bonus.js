const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const BonusSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = Bonus = mongoose.model('bonuses', BonusSchema)
