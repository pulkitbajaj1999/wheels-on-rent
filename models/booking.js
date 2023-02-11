const mongoose = require('mongoose')
const Schema = mongoose.Schema

// define model structure
const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  vehicle: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Vehicle',
  },
  date: {
    type: Date,
  },
  days: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('Booking', bookingSchema)
