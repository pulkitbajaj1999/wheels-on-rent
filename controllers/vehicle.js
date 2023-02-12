// import models
const Vehicle = require('../models/vehicle')
const Booking = require('../models/booking')
const User = require('../models/user')

// controllers
module.exports.getVehicles = (req, res, next) => {
  const searchQuery = req.query.q
  const options = searchQuery
    ? {
        $or: [{ model: { $regex: searchQuery, $options: 'i' } }],
      }
    : {}
  Vehicle.find(options)
    .lean()
    .then((vehicles) => {
      return res.status(200).json({
        status: 'ok',
        msg: 'vehicles fetched successfully',
        vehicles,
      })
    })
    .catch((err) => {
      next(err)
    })
}

// optimize bookings on vehicle
module.exports.getVehiclesWithBookings = (req, res, next) => {
  const searchQuery = req.query.q
  const options = searchQuery
    ? {
        $or: [{ model: { $regex: searchQuery, $options: 'i' } }],
      }
    : {}
  Booking.find()
    .lean()
    .then((bookings) => {
      Vehicle.find(options)
        .lean()
        .then((vehicles) => {
          vehicles = vehicles.map((vehicle) => {
            return {
              ...vehicle,
              bookings: bookings.filter(
                (booking) =>
                  booking.vehicle.toString() === vehicle._id.toString()
              ),
            }
          })
          return res.status(200).json({
            status: 'ok',
            msg: 'vehicles fetched successfully',
            vehicles,
          })
        })
        .catch((err) => {
          next(err)
        })
    })
}

module.exports.getVehicleById = (req, res, next) => {
  const { vehicleId } = req.params
  if (!vehicleId)
    return res.status(400).json({
      status: 'error',
      msg: 'vehicle-id not provided',
    })
  Vehicle.findById(vehicleId)
    .lean()
    .then((vehicle) => {
      if (!vehicle) {
        return res.status(404).json({
          status: 'error',
          msg: 'vehicle not found',
        })
      }
      return res.status(200).json({
        status: 'ok',
        msg: 'vehicle-by-id fetch success',
        vehicle: vehicle,
      })
    })
    .catch((err) => {
      next(err)
    })
}

module.exports.addVehicle = async (req, res, next) => {
  try {
    const userId = req.user ? req.user._id : null
    if (!userId) {
      return res.status(401).json({
        status: 'error',
        msg: 'user not logged-in',
      })
    }
    const { number, model, capacity, rent, details } = req.body

    if (!number || !model || !capacity || !rent)
      return res.status(400).json({
        status: 'error',
        msg: 'insufficient payload',
      })

    const existingVehicle = await Vehicle.findOne({ model: model })
    if (existingVehicle) {
      return res.status(400).json({
        status: 'error',
        msg: 'vehicle with given model already exists',
      })
    }
    const vehicle = new Vehicle({
      number,
      model,
      capacity: parseInt(capacity),
      rent: parseInt(rent),
      details,
    })

    if (req.files && req.files.image) {
      const file = req.files.image[0]
      vehicle.imageUrl = `media/images/${file.filename}`
    }

    await vehicle.save().then((vehicle) => {
      return res.status(201).json({
        status: 'ok',
        msg: 'vehicle added',
        vehicle: vehicle,
      })
    })
  } catch (err) {
    next(err)
  }
}
module.exports.editVehicle = async (req, res, next) => {
  try {
    const userId = req.user ? req.user._id : null
    if (!userId) {
      return res.status(401).json({
        status: 'error',
        msg: 'user not logged-in',
      })
    }

    const { vehicleId } = req.params
    const { number, model, capacity, rent, details } = req.body

    if (!vehicleId || !number || !model || !capacity || !rent)
      return res.status(400).json({
        status: 'error',
        msg: 'insufficient payload',
      })

    const vehicle = await Vehicle.findById(vehicleId)
    if (!vehicle) {
      return res.status(404).json({
        status: 'error',
        msg: 'vehicle does not exist',
      })
    }

    vehicle.number = number
    vehicle.model = model
    vehicle.capacity = parseInt(capacity)
    vehicle.rent = parseInt(rent)
    vehicle.details = details

    if (req.files && req.files.image) {
      const file = req.files.image[0]
      vehicle.imageUrl = `media/images/${file.filename}`
    }

    await vehicle.save().then((vehicle) => {
      return res.status(201).json({
        status: 'ok',
        msg: 'vehicle edited',
        vehicle: vehicle,
      })
    })
  } catch (err) {
    next(err)
  }
}

module.exports.deleteVehicle = async (req, res, next) => {
  try {
    const userId = req.user ? req.user._id : null
    if (!userId) {
      return res.status(401).json({
        status: 'error',
        msg: 'user not logged-in',
      })
    }
    const { vehicleId } = req.params

    if (!vehicleId)
      return res.status(400).json({
        status: 'error',
        msg: 'insufficient payload',
      })

    const vehicle = await Vehicle.findById(vehicleId)
    if (!vehicle) {
      return res.status(404).json({
        status: 'error',
        msg: 'vehicle does not exist',
      })
    }

    await vehicle.remove().then((result) => {
      return res.status(200).json({
        status: 'ok',
        msg: 'vehicle deleted',
        result: result,
      })
    })
  } catch (err) {
    next(err)
  }
}
