const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

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

AdminSchema.pre('save', async function(next) {
  try {
    const user = this
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)

    user.password = hash
    next()
  } catch (err) {
    console.log(err)
  }
})

module.exports = Admin = mongoose.model('admins', AdminSchema)
