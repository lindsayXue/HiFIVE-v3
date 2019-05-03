const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const RecordSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  bonus: [
    {
      type: Schema.Types.ObjectId,
      ref: 'bonuses'
    }
  ],
  points: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = Record = mongoose.model('records', RecordSchema)
