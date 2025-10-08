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
router.get('/users/:userId', getReservationByUserId);
router.post('/', createReservation);
router.post('/fullslots', getFullSlots); // Get all reserved times
router.post('/reservables', getReservables);
router.post('/:reservationId', getReservationById);
router.put('/:reservationId', updateReservation);
router.delete('/:reservationId', deleteReservation);

module.exports = router;
