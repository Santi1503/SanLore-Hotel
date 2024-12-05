const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");
const reservationController = require("../Controllers/reservationController");

// reservation routes
router.post("/reserve", auth, reservationController.createReservation);  // Realizar nueva reserva
router.get("/reservations", auth, reservationController.getReservations); // Ver reservas del usuario
router.get("/active", auth, reservationController.getActiveReservations); // Ver reservas del usuario
router.get("/pending", auth, reservationController.getPendingReservations); // Ver reservas del usuario
router.put("/update-reservation", auth, reservationController.updateReservation); // Modificar una reserva
router.delete("/cancel-reservation", auth, reservationController.cancelReservation); // Cancelar una reserva

module.exports = router;