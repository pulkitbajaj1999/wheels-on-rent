const router = require('express').Router()
const vehicleController = require('../controllers/vehicle')

// define routes preceding with: public/...

// GET all vehicles
router.get('/', vehicleController.getVehicles)

// GET all vehicles with bookings
router.get('/bookings', vehicleController.getVehiclesWithBookings)

// GET vehicle by id
router.get('/:vehicleId', vehicleController.getVehicleById)

// POST add new vehicle
router.post('/add', vehicleController.addVehicle)

// PUT edit vehicle
router.put('/:vehicleId/edit', vehicleController.editVehicle)

// DELETE vehicle
router.delete('/:vehicleId/delete', vehicleController.deleteVehicle)

// export router
module.exports = router
