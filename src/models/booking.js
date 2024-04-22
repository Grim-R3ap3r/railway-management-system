

const db = require("../db");

const bookSeat = async (userId, trainId) => {
    await db.query("INSERT INTO bookings (user_id, train_id) VALUES ($1, $2)", [userId, trainId]);
};

const getBookingsByUserId = async (userId) => {
    const result = await db.query("SELECT * FROM bookings WHERE user_id = $1", [userId]);
    return result.rows;
};

module.exports = {
    bookSeat,
    getBookingsByUserId
};
