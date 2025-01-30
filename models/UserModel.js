const sequelize = require("sequelize");
const database = require("../config/database");

const Users = database.define('Users', {
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    firstName: {
        type: sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize.STRING,
        allowNull: false
    },
    emailId: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    age: {
        type: sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: true
});

// Sync the model with the database
database.sync()
    .then(() => console.log('User table created'))
    .catch(err => console.error(err));

module.exports = Users;
