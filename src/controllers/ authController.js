

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const db = require("../db");

const register = async (req, res, next) => {
    try {
        const { username, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query("INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *", [username, hashedPassword, role]);
        const user = result.rows[0];
        res.json({ user });
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = result.rows[0];
        if (!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        const token = jwt.sign({ userId: user.user_id, username: user.username, role: user.role }, config.jwtSecret, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    register,
    login
};
