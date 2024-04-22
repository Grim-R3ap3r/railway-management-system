

const db = require("../db");

const addUser = async (req, res, next) => {
    try {
        const { username, password, role } = req.body;
        const result = await db.query("INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *", [username, password, role]);
        const user = result.rows[0];
        res.json({ user });
    } catch (err) {
        next(err);
    }
};

const getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const result = await db.query("SELECT * FROM users WHERE user_id = $1", [userId]);
        const user = result.rows[0];
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user });
    } catch (err) {
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const { username, password, role } = req.body;
        const result = await db.query("UPDATE users SET username = $1, password = $2, role = $3 WHERE user_id = $4 RETURNING *", [username, password, role, userId]);
        const user = result.rows[0];
        res.json({ user });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    addUser,
    getUser,
    updateUser
};
