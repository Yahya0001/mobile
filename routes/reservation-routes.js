const express = require('express');

const { Create, ApproveState, RejectState, getAllReservations } = require('../controllers/ReservationController');

const router = express.Router();

router.post('/reservation', Create);
router.put('/reservation/approve/:id', ApproveState);
router.put('/reservation/reject/:id', RejectState);
router.get('/reservations', getAllReservations);




module.exports = {
    routes: router
}