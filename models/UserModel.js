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
    password: {
        type: sequelize.STRING,
        allowNull: false,
    },
    photoUrl: {
        type: sequelize.STRING,
        allowNull: null,
        defaultValue: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsS2NXAV6lRKgQ7LNH7LzCeq3WdDC3wRsT6Q&s"
    },
    age: {
        type: sequelize.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'Users',
    timestamps: true
});

// Sync the model with the database
database.sync()
    .then(() => console.log('User table created'))
    .catch(err => console.error(err));

module.exports = Users;
