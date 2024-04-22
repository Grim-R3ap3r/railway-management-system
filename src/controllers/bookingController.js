

const db = require("../db");

const bookSeat = async (req, res, next) => {
    try {
        const { trainId } = req.body;
        const userId = req.user.userId;
        // Check if seat is available
        const trainResult = await db.query("SELECT total_seats FROM trains WHERE train_id = $1", [trainId]);
        const totalSeats = trainResult.rows[0].total_seats;
        const bookingsResult = await db.query("SELECT COUNT(*) AS booked_seats FROM bookings WHERE train_id = $1", [trainId]);
        const bookedSeats = bookingsResult.rows[0].booked_seats;
        if (bookedSeats >= totalSeats) {
            return res.status(400).json({ message: "No seats available on this train" });
        }
        // Book the seat
        await db.query("INSERT INTO bookings (user_id, train_id) VALUES ($1, $2)", [userId, trainId]);
        res.json({ message: "Seat booked successfully" });
    } catch (err) {
        next(err);
    }
};

const getBookings = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const result = await db.query("SELECT * FROM bookings WHERE user_id = $1", [userId]);
        const bookings = result.rows;
        res.json({ bookings });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    bookSeat,
    getBookings
};
