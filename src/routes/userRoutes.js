

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Add a new user (admin only)
router.post("/", authMiddleware.verifyAdminApiKey, userController.addUser);

// Get user details (admin only)
router.get("/:userId", authMiddleware.verifyAdminApiKey, userController.getUser);

// Update user information (admin only)
router.put("/:userId", authMiddleware.verifyAdminApiKey, userController.updateUser);

module.exports = router;
