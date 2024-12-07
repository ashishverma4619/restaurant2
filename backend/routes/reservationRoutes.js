const express = require("express");
const router = express.Router();
const ReservationController = require("../controllers/reservationController")

// Get all reservations
router.get("/", ReservationController.getReservations);

// Add a new reservation
router.post("/", ReservationController.addReservation);

// Approve a reservation
router.patch("/:id", ReservationController.approveReservation);


module.exports = router;
