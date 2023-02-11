// import models
const Booking = require('../models/booking')
const User = require('../models/user')
const Vehicle = require('../models/vehicle')

// controllers
module.exports.getBookings = (req, res, next) => {
  const searchQuery = req.query.q
  Booking.find()
    .populate('user vehicle')
    .lean()
    .then((bookings) => {
      return res.status(200).json({
        status: 'ok',
        msg: 'bookings fetched successfully',
        bookings: bookings,
      })
    })
    .catch((err) => {
      next(err)
    })
}

module.exports.getBookingsById = (req, res, next) => {
  const { bookingId } = req.params
  if (!bookingId)
    return res.status(400).json({
      status: 'error',
      msg: 'booking-id not provided',
    })
  Booking.findById(bookingId)
    .populate('user vehicle')
    .lean()
    .then((booking) => {
      if (!booking) {
        return res.status(404).json({
          status: 'error',
          msg: 'booking not found',
        })
      }
      return res.status(200).json({
        status: 'ok',
        msg: 'booking-by-id fetch success',
        booking: booking,
      })
    })
    .catch((err) => {
      next(err)
    })
}

module.exports.getCustomerBookings = (req, res, next) => {
  const userId = req.user ? req.user._id : null
  if (!userId) {
    return res.status(401).json({
      status: 'error',
      msg: 'user not logged-in',
    })
  }
  Booking.find({ user: userId })
    .populate('user vehicle')
    .lean()
    .then((bookings) => {
      return res.status(200).json({
        status: 'ok',
        msg: 'bookings fetched',
        bookings: bookings,
      })
    })
    .catch((err) => {
      next(err)
    })
}

module.exports.addBooking = async (req, res, next) => {
  try {
    const userId = req.user ? req.user._id : null
    if (!userId) {
      return res.status(401).json({
        status: 'error',
        msg: 'user not logged-in',
      })
    }
    const { vehicleId, date } = req.body
    let { days } = req.body

    if (!vehicleId || !date || !days)
      return res.status(400).json({
        status: 'error',
        msg: 'insufficient payload',
      })

    days = parseInt(days)
    if (days <= 0)
      return res.status(400).json({
        status: 'error',
        msg: 'invalid days',
      })

    const vehicle = await Vehicle.findById(vehicleId)
    if (!vehicle)
      return res.status(404).json({
        status: 'error',
        msg: 'vehicle does not exists',
      })

    const booking = new Booking({
      user: userId,
      vehicle: vehicleId,
      date: date,
      days: days,
    })

    await booking.save().then((booking) => {
      return res.status(201).json({
        status: 'ok',
        msg: 'booking added',
        booking: booking,
      })
    })
  } catch (err) {
    next(err)
  }
}

module.exports.editBooking = async (req, res, next) => {
  try {
    const userId = req.user ? req.user._id : null
    if (!userId) {
      return res.status(401).json({
        status: 'error',
        msg: 'user not logged-in',
      })
    }
    const { bookingId } = req.params
    let { vehicleId, date, days } = req.body

    if (!bookingId || !vehicleId || !date || !days)
      return res.status(400).json({
        status: 'error',
        msg: 'insufficient payload',
      })

    days = parseInt(days)
    date = new Date(date)

    if (days <= 0)
      return res.status(400).json({
        status: 'error',
        msg: 'invalid days',
      })

    const vehicle = await Vehicle.findById(vehicleId)
    if (!vehicle)
      return res.status(404).json({
        status: 'error',
        msg: 'vehicle does not exists',
      })

    const booking = await Booking.findById(bookingId)
    if (!booking) {
      return res.status(404).json({
        status: 'error',
        msg: 'booking does not exist',
      })
    }

    booking.vehicle = vehicleId
    booking.date = date
    booking.days = days

    await booking.save().then((booking) => {
      return res.status(200).json({
        status: 'ok',
        msg: 'booking updated',
        booking: booking,
      })
    })
  } catch (err) {
    next(err)
  }
}

module.exports.deleteBooking = async (req, res, next) => {
  try {
    const userId = req.user ? req.user._id : null
    if (!userId) {
      return res.status(401).json({
        status: 'error',
        msg: 'user not logged-in',
      })
    }
    const { bookingId } = req.params

    if (!bookingId)
      return res.status(400).json({
        status: 'error',
        msg: 'insufficient payload',
      })

    const booking = await Booking.findById(bookingId)
    if (!booking) {
      return res.status(404).json({
        status: 'error',
        msg: 'booking does not exist',
      })
    }

    await booking.remove().then((result) => {
      return res.status(200).json({
        status: 'ok',
        msg: 'booking delete',
        result: result,
      })
    })
  } catch (err) {
    next(err)
  }
}
