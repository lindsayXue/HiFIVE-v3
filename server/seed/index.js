const Team = require('../models/Team')
const Admin = require('../models/Admin')
const Promise = require('bluebird')
const teams = require('./teams.json')
const admins = require('./admins.json')
const mongoose = require('mongoose')
const config = require('config')

// DB Config
const db = config.mongoURI

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(async () => {
    await Promise.all(
      teams.map(team => {
        const newwTeam = new Team(team)
        newwTeam.save()
      })
    )

    await Promise.all(
      admins.map(admin => {
        const newAdmin = new Admin(admin)
        newAdmin.save()
      })
    )
  })
