

const db = require("../db");

const addTrain = async (source, destination, totalSeats) => {
    const result = await db.query("INSERT INTO trains (source, destination, total_seats) VALUES ($1, $2, $3) RETURNING *", [source, destination, totalSeats]);
    return result.rows[0];
};

const getTrainById = async (trainId) => {
    const result = await db.query("SELECT * FROM trains WHERE train_id = $1", [trainId]);
    return result.rows[0];
};

const updateTrain = async (trainId, source, destination, totalSeats) => {
    const result = await db.query("UPDATE trains SET source = $1, destination = $2, total_seats = $3 WHERE train_id = $4 RETURNING *", [source, destination, totalSeats, trainId]);
    return result.rows[0];
};

module.exports = {
    addTrain,
    getTrainById,
    updateTrain
};
