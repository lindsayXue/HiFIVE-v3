const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = Admin = mongoose.model('admins', AdminSchema)
