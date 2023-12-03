const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-sequelize', 'root', '1682', {
    dialect:'mysql',
    host: 'localhost'
})//('databasename', 'username', 'password') dialect and host is optional

module.exports = sequelize;