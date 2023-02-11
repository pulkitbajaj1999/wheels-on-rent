const router = require('express').Router()
const bookingController = require('../controllers/booking')
const jwtAuthMiddleware = require('../middlewares/jwtAuth')

// define routes preceding with: public/...

// GET all bookings
router.get('/', bookingController.getBookings)

// GET customer bookings
router.get('/customer', bookingController.getCustomerBookings)

// GET booking by id
router.get('/:bookingId', bookingController.getBookingsById)

// POST add new booking
router.post('/add', bookingController.addBooking)

// PUT edit booking
router.put('/:bookingId/edit', bookingController.editBooking)

// DELETE booking
router.delete('/:bookingId/delete', bookingController.deleteBooking)

// export router
module.exports = router
