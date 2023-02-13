const router = require('express').Router()
const jwtAuthMiddleware = require('../middlewares/jwtAuth')
const bookingController = require('../controllers/booking')

// define routes preceding with: public/...

// GET all bookings
router.get(
  '/',
  jwtAuthMiddleware.checkRole(['AGENT']),
  bookingController.getBookings
)

// GET customer bookings
router.get(
  '/customer',
  jwtAuthMiddleware.checkRole(['CUSTOMER']),
  bookingController.getCustomerBookings
)

// GET booking by id
router.get(
  '/:bookingId',
  jwtAuthMiddleware.checkRole(['CUSTOMER', 'AGENT']),
  bookingController.getBookingById
)

// POST add new booking
router.post(
  '/add',
  jwtAuthMiddleware.checkRole(['CUSTOMER']),
  bookingController.addBooking
)

// PUT edit booking
router.put(
  '/:bookingId/edit',
  jwtAuthMiddleware.checkRole(['CUSTOMER']),
  bookingController.editBooking
)

// DELETE booking
router.delete(
  '/:bookingId/delete',
  jwtAuthMiddleware.checkRole(['CUSTOMER']),
  bookingController.deleteBooking
)

// export router
module.exports = router
