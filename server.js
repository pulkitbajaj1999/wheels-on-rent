// core modules imports
const path = require('path')
const fs = require('fs')

// third-party imports
require('dotenv').config()
const express = require('express')
const bodyparser = require('body-parser')
const multer = require('multer')
const bcryptjs = require('bcryptjs')
const cors = require('cors')
const compression = require('compression')

// local imports
const User = require('./models/user')
const dbConnect = require('./utils/db').dbConnect
const jwtAuthMiddleware = require('./middlewares/jwtAuth')

// route imports
const authRoutes = require('./routes/auth')
const bookingRoutes = require('./routes/booking')
const vehicleRoutes = require('./routes/vehicle')
const adminRoutes = require('./routes/admin')

// required objects
const app = express()
const multerStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().getTime() +
        '-' +
        file.originalname.replace(/[^a-z0-9.]/gi, '_').toLowerCase()
    )
  },
  destination: (req, file, cb) => {
    // create the directories if not exist
    fs.mkdirSync('static/media/images', { recursive: true })

    // save the files based on the field provided
    if (file.fieldname === 'image') {
      cb(null, './static/media/images')
    } else {
      cb(Error('unsupported file field'))
    }
  },
})

const multerMiddleware = multer({
  storage: multerStorage,
  limits: {
    fileSize: (process.env.MULTER_MAX_FILE_SIZE || 1) * 1024 * 1024,
  },
}).fields([{ name: 'image', maxCount: 1 }])

// cross origin request support
app.use(cors())

// using compression
app.use(compression())

// parsing body-content
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use((req, res, next) => {
  multerMiddleware(req, res, (err) => {
    if (err)
      return res.status(500).json({
        status: 'error',
        msg: 'Error while storing files using multer storage!',
        err: err,
      })
    next()
  })
})

// using jwt authentication middleware
app.use(jwtAuthMiddleware.setAuth)

// serve public files
app.use(express.static(path.join(__dirname, 'public')))

// serve media files from local storage
app.use('/media', express.static(path.join(__dirname, 'static', 'media')))

// serving routes
app.use('/api/vehicles', vehicleRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/auth', authRoutes)
// app.use('/api/admin', jwtAuthMiddleware.checkRole(['ADMIN']), adminRoutes)

// handle Internal server errors
app.use((err, req, res, next) => {
  if (err) {
    console.log('Internal-error', err)
    return res.status(500).json({
      msg: 'Internal Server Error',
      err: err,
    })
  }
  // if no error found continue to next routes
  next()
})

// serve static files from frontend build
app.use(express.static(path.join(__dirname, 'frontend', 'build')))
// serve frontend routes

app.get('/*', (req, res, next) => {
  const indexPath = path.join(__dirname, 'frontend', 'build', 'index.html')
  if (fs.existsSync(indexPath)) return res.status(200).sendFile(indexPath)
  next()
})

// declare host and port
const PORT = process.env.PORT || 8000
const HOST = process.env.HOST || '0.0.0.0'
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/wheelsonrent'

const SALT_LENGTH = 12
// start server
dbConnect(MONGODB_URI).then(() => {
  User.findOne({ role: 'ADMIN' })
    .then((admin) => {
      if (!admin) {
        const password = process.env.ADMIN_PASS || 'admin'
        bcryptjs.hash(password, SALT_LENGTH).then((hashedPassword) => {
          const defaultAdmin = new User({
            email: 'admin@wheelsonrent',
            password: hashedPassword,
            role: 'ADMIN',
          })
          return defaultAdmin.save()
        })
      }
    })
    .catch((err) => {
      console.log('__error_while_creating_default_admin__', err)
    })
  app.listen(PORT, HOST, (err) => {
    console.log(`App started at port:${PORT}`)
  })
})
