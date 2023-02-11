const mongoose = require('mongoose')
const Schema = mongoose.Schema

// define model structure
const vehicleSchema = new Schema({
  number: {
    type: String,
    required: true,
  },
  model: {
    type: String,
  },
  capacity: {
    type: Number,
  },
  rent: {
    type: Number,
  },
  imageUrl: {
    type: String,
  },
  details: {
    type: String,
  },
})

module.exports = mongoose.model('Vehicle', vehicleSchema)
