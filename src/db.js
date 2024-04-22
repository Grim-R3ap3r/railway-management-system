
const { Pool } = require("pg");
const config = require("./config");

const pool = new Pool(config.db);

module.exports = {
    query: (text, params) => pool.query(text, params),
    connect: async () => {
        try {
            await pool.connect();
            console.log("Database connection established");
        } catch (err) {
            console.error("Unable to connect to the database:", err);
            throw err;
        }
    }
};
