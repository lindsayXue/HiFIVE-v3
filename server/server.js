const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const Routes = require('./routes/index')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const passport = require('passport')

// Passport Config
require('./config/passport_setup')(passport)
const path = require('path')

const app = express()

// Connect to MongoDB
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

// Cors
app.use(
  cors({
    origin: true,
    credentials: true
  })
)

app.use(cookieParser())

const config = require('config')
const cookieAge = 24 * 60 * 60 * 1000 // 24 hours
app.use(
  session({
    secret: config.get('sessionSecret'),
    store: new FileStore(),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: cookieAge
    }
  })
)

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//User Routes
app.use('/api', Routes)

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  console.log('production mode')
  // set static folder
  app.use(express.static('build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server runing on port ${port}`))
