'use strict';

var Sequelize = require('sequelize');
var sequelize = new Sequelize('phantomrunner', 'root');

var Users = sequelize.define('Users',{
  id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
  email: {type: Sequelize.STRING, allowNull: false, defaultValue: ''},
  encrypted_password: {type: Sequelize.STRING, allowNull: false, defaultValue: ''},
});


module.exports = {
    Users: Users
};