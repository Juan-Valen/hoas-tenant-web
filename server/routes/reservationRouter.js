const express = require('express');
const router = express.Router();
const {
    getAllReservations,
    getReservables,
    createReservation,
    getReservationById,
    updateReservation,
    deleteReservation,
    getFullSlots,
    getReservationByUserId
} = require('../controllers/reservationControllers');

router.get('/', getAllReservations);
router.post('/reservables', getReservables);
router.post('/', createReservation);
router.get('/users/:userId', getReservationByUserId);
router.get('/:reservationId', getReservationById);
router.put('/:reservationId', updateReservation);
router.delete('/:reservationId', deleteReservation);
router.get('/reservedslots/:reserved_id', getReservedSlots); // Get all reserved times

module.exports = router;
