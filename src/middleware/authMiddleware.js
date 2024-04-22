

const jwt = require("jsonwebtoken");
const config = require("../config");

const verifyAuthToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Authentication token is required" });
    }
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

const verifyAdminApiKey = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey || apiKey !== config.adminApiKey) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    next();
};

module.exports = {
    verifyAuthToken,
    verifyAdminApiKey
};
