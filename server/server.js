const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const Routes = require('./routes/index')
// const passportSetup = require('./config/passport_setup')
const path = require('path')

const app = express()

// Connect to MongoDB
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

// Cors
app.use(cors())

//User Routes
app.use('/api', Routes)

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(_dirname, 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server runing on port ${port}`))
