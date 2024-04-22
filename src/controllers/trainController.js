

const db = require("../db");

const addTrain = async (req, res, next) => {
    try {
        const { source, destination, totalSeats } = req.body;
        const result = await db.query("INSERT INTO trains (source, destination, total_seats) VALUES ($1, $2, $3) RETURNING *", [source, destination, totalSeats]);
        const train = result.rows[0];
        res.json({ train });
    } catch (err) {
        next(err);
    }
};

const getTrain = async (req, res, next) => {
    try {
        const trainId = req.params.trainId;
        const result = await db.query("SELECT * FROM trains WHERE train_id = $1", [trainId]);
        const train = result.rows[0];
        if (!train) {
            return res.status(404).json({ message: "Train not found" });
        }
        res.json({ train });
    } catch (err) {
        next(err);
    }
};

const updateTrain = async (req, res, next) => {
    try {
        const trainId = req.params.trainId;
        const { source, destination, totalSeats } = req.body;
        const result = await db.query("UPDATE trains SET source = $1, destination = $2, total_seats = $3 WHERE train_id = $4 RETURNING *", [source, destination, totalSeats, trainId]);
        const train = result.rows[0];
        res.json({ train });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    addTrain,
    getTrain,
    updateTrain
};
