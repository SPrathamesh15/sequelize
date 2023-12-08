const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const newUser = sequelize.define('newUser', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING
});

module.exports = newUser;