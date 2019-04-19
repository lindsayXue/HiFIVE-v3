const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ActivitySchema = new Schema({})

module.exports = Activity = mongoose.model('activity', ActivitySchema)
