const express = require("express");
const multer = require("multer");
const router = express.Router();
const auth = require("../Middleware/auth")
const userController = require("../Controllers/userController")

// user routes
router.post("/register", userController.register)
router.post("/login", userController.login)
router.put("/update", auth, userController.update)
router.get("/profile/:id", auth, userController.profile)

module.exports = router;