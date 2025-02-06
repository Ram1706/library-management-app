require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST_NAME,
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST_NAME,
    dialect: "postgres",
  },
};

// DB Migration Command --> npx sequelize-cli db:migrate
// To create a migration file --> npx sequelize-cli migration:generate --name add-new-colums