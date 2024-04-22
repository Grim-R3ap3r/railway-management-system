

const db = require("../db");

const addUser = async (username, password, role) => {
    const result = await db.query("INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *", [username, password, role]);
    return result.rows[0];
};

const getUserById = async (userId) => {
    const result = await db.query("SELECT * FROM users WHERE user_id = $1", [userId]);
    return result.rows[0];
};

const updateUser = async (userId, username, password, role) => {
    const result = await db.query("UPDATE users SET username = $1, password = $2, role = $3 WHERE user_id = $4 RETURNING *", [username, password, role, userId]);
    return result.rows[0];
};

module.exports = {
    addUser,
    getUserById,
    updateUser
};
