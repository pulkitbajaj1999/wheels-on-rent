const router = require('express').Router()
const jwtAuthMiddleware = require('../middlewares/jwtAuth')
const authController = require('../controllers/auth')

// define routes preceding with: auth/...

// GET user
router.get(
  '/user',
  jwtAuthMiddleware.checkRole(['CUSTOMER', 'AGENT']),
  authController.getUserDetails
)

// POST login
router.post('/login', authController.postLogin)

// POST Sign UP
router.post('/signup', authController.postSignup)

module.exports = router
