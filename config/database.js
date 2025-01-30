const sequelize = require("sequelize");

const DB_DIALECT = process.env.DB_DIALECT;
const DB_HOST_NAME = process.env.DB_HOST_NAME;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

// Establishing the DB connection
const database = new sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: DB_DIALECT,
    host: DB_HOST_NAME,
    port: DB_PORT,
    logging: true, // Disable logging for production
    pool: {
        max: 10,      // Max connections
        min: 2,       // Min connections
        acquire: 30000, // Max time (ms) to acquire a connection
        idle: 10000   // Max time (ms) a connection can be idle
    }
});

module.exports = database;