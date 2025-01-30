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
    port: DB_PORT
});

module.exports = database;