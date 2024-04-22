

const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");

// Book a seat on a train
router.post("/", authMiddleware.verifyAuthToken, bookingController.bookSeat);

// Get booking details for a user
router.get("/", authMiddleware.verifyAuthToken, bookingController.getBookings);

module.exports = router;
