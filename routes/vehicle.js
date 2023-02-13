const router = require('express').Router()
const jwtAuthMiddleware = require('../middlewares/jwtAuth')
const vehicleController = require('../controllers/vehicle')

// define routes preceding with: public/...

// GET all vehicles
router.get('/', vehicleController.getVehicles)

// GET all vehicles with bookings
router.get(
  '/bookings',
  jwtAuthMiddleware.checkRole(['AGENT']),
  vehicleController.getVehiclesWithBookings
)

// GET vehicle by id
router.get('/:vehicleId', vehicleController.getVehicleById)

// POST add new vehicle
router.post(
  '/add',
  jwtAuthMiddleware.checkRole(['AGENT']),
  vehicleController.addVehicle
)

// PUT edit vehicle
router.put(
  '/:vehicleId/edit',
  jwtAuthMiddleware.checkRole(['AGENT']),
  vehicleController.editVehicle
)

// DELETE vehicle
router.delete(
  '/:vehicleId/delete',
  jwtAuthMiddleware.checkRole(['AGENT']),
  vehicleController.deleteVehicle
)

// export router
module.exports = router
