'use strict';

var Sequelize = require('sequelize');
var sequelize = new Sequelize('squean', 'root');

var Users = sequelize.define('Users',{
  id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
  email: {type: Sequelize.STRING, allowNull: false, defaultValue: ''},
  encryptedPassword: {type: Sequelize.STRING, allowNull: false, defaultValue: ''},
  createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: ''},
  updatedAt: {type: Sequelize.DATE, allowNull: false, defaultValue: ''}

});


module.exports = {
    Users: Users
};