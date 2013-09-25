'use strict';

var Sequelize = require('sequelize');
// TODO: set up simple MySQL db and link to it here
var sequelize = new Sequelize('phantomrunner', 'root');

var Users = sequelize.define('Users',{
  id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
  email: {type: Sequelize.STRING, allowNull: false, defaultValue: ''},
  encryptedPassword: {type: Sequelize.STRING, allowNull: false, defaultValue: ''},
});


module.exports = {
    Users: Users
};