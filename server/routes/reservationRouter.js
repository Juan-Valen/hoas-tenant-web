const express = require('express');
const router = express.Router();
const {
  getAllReservations,
  createReservation,
  getReservationById,
  updateReservation,
  deleteReservation,
  getFreeSlots
} = require('../controllers/reservationControllers');

router.get('/', getAllReservations);
router.post('/', createReservation);
router.get('/:reservationId', getReservationById);
router.put('/:reservationId', updateReservation);
router.delete('/:reservationId', deleteReservation);
router.get('/freeslots/:start/:end', getFreeSlots); // Example route for free slots

module.exports = router;
