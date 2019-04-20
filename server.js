const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const users = require('./routes/api/users')
const records = require('./routes/api/records')
const bonuses = require('./routes/api/bonuses')

const app = express()

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// DB Config
const db = require('./config/keys').mongoURI

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

// User Routes
app.use('/api/users', users)

// Record Routes
app.use('/api/records', records)

// Bonus Routes
app.use('/api/bonuses', bonuses)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server runing on port ${port}`))