const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const Routes = require('./routes/index')
// const passportSetup = require('./config/passport_setup')

const app = express()

// Connect to MongoDB
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

// Cors
app.use(cors())

//User Routes
app.use('/api', Routes)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server runing on port ${port}`))
