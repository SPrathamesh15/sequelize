const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const GeneralStore = sequelize.define('generalStore', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  productname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  productDescription: {
    type: Sequelize.STRING,
    allowNull: false
  },
  productprice: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  productquantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = GeneralStore;
