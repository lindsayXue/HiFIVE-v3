const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const AdminPostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  // text: {
  //   type: String,
  //   required: true
  // },
  // likes: [
  //   {
  //     user: {
  //       type: String,
  //       ref: 'users',
  //       required: true
  //     }
  //   }
  // ],
  // comments: [
  //   {
  //     user: {
  //       type: String,
  //       ref: 'users',
  //       required: true
  //     },
  //     text: {
  //       type: String,
  //       required: true
  //     },
  //     date: {
  //       type: Date,
  //       default: Date.now
  //     }
  //   }
  // ],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = AdminPost = mongoose.model('adminposts', AdminPostSchema)
