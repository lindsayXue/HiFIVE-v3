const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const FooterSchema = new Schema({
  content: {
    type: String,
    default: ' Copyright &copy;  HiFIVE'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = Footer = mongoose.model('footers', FooterSchema)
