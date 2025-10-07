const express = require('express');
const router = express.Router();
const {
    getAllReservations,
    getReservables,
    createReservation,
    getReservationById,
    updateReservation,
    deleteReservation,
    getFullSlots
} = require('../controllers/reservationControllers');

router.get('/', getAllReservations);
router.get('/reservables', getReservables);
router.post('/', createReservation);
router.get('/:reservationId', getReservationById);
router.put('/:reservationId', updateReservation);
router.delete('/:reservationId', deleteReservation);
router.get('/fullslots/:reserved_id', getFullSlots); // Get all reserved times

module.exports = router;
