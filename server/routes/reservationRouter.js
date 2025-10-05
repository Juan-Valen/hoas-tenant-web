const express = require('express');
const router = express.Router();
const {
  getAllReservations,
  createReservation,
  getReservationById,
  updateReservation,
  deleteReservation,
  getReservedSlots
} = require('../controllers/reservationControllers');

router.get('/', getAllReservations);
router.post('/', createReservation);
router.get('/:reservationId', getReservationById);
router.put('/:reservationId', updateReservation);
router.delete('/:reservationId', deleteReservation);
router.get('/reservedslots/:reserved_id', getReservedSlots); // Get all reserved times

module.exports = router;
