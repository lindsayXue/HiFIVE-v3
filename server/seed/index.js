const Team = require('../models/Team')
const Promise = require('bluebird')
const teams = require('./teams.json.js')
const mongoose = require('mongoose')

// DB Config
const db = require('../config/keys').mongoURI

mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(async () => {
    await Promise.all(
      teams.map(team => {
        const newwTeam = new Team(team)
        newwTeam.save()
      })
    )
  })
