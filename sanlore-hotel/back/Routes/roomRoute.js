const express = require("express");
const router = express.Router();
const roomController = require("../Controllers/roomController");
const auth = require("../Middleware/auth")
const adminAuth = require("../Middleware/adminAuth")

// Rutas para las habitaciones
router.post("/create", auth, roomController.createRoom);  // Crear una habitación
router.get("/", roomController.getRooms);          // Obtener todas las habitaciones
router.get("/:id", roomController.getRoomById);    // Obtener una habitación por su ID
router.put("/:id", auth, roomController.updateRoom);     // Actualizar una habitación
router.delete("/:id", roomController.deleteRoom);  // Eliminar una habitación

module.exports = router;