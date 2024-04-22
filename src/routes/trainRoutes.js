

const express = require("express");
const router = express.Router();
const trainController = require("../controllers/trainController");
const authMiddleware = require("../middleware/authMiddleware");

// Add a new train (admin only)
router.post("/", authMiddleware.verifyAdminApiKey, trainController.addTrain);

// Get train details
router.get("/:trainId", trainController.getTrain);

// Update train information (admin only)
router.put("/:trainId", authMiddleware.verifyAdminApiKey, trainController.updateTrain);

module.exports = router;
