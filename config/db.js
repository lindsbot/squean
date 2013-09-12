'use strict';

var Sequelize = require('sequelize');
var sequelize = new Sequelize('phantomrunner', 'root', 'plantlife');

module.exports = function() {

  var Users = sequelize.define('Users',{
    id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    email: {type: Sequelize.STRING, allowNull: false, defaultValue: ''},
    encrypted_password: {type: Sequelize.STRING, allowNull: false, defaultValue: ''},
    reset_password_token: {type: Sequelize.STRING, defaultValue: null, unique: true},
    reset_password_sent_at: {type: Sequelize.DATE, defaultValue: null},
    remember_created_at: {type: Sequelize.DATE, defaultValue: null},
    sign_in_count: {type: Sequelize.INTEGER, defaultValue: 0},
    current_sign_in_at: {type: Sequelize.DATE, defaultValue: null},
    last_sign_in_at: {type: Sequelize.DATE, defaultValue: null},
    current_sign_in_ip: {type: Sequelize.STRING, defaultValue: null},
    last_sign_in_ip: {type: Sequelize.STRING, defaultValue: null},
    created_at: {type: Sequelize.DATE, allowNull: false},
    updated_at: {type: Sequelize.DATE, allowNull: false},
    admin: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0},
    first_name: {type: Sequelize.STRING, allowNull: false},
    last_name: {type: Sequelize.STRING, allowNull: false},
    gender: {type: Sequelize.STRING, allowNull: false},
    state: {type: Sequelize.STRING, defaultValue: null},
    birthday: {type: Sequelize.DATE, defaultValue: null},
    time_zone: {type: Sequelize.STRING, allowNull: false},
    vagrant: {type: Sequelize.BOOLEAN, defaultValue: null},
    favorite_shoe: {type: Sequelize.STRING, defaultValue: null},
    shipping_address_id: {type: Sequelize.INTEGER, defaultValue: null},
    race_manager: {type: Sequelize.BOOLEAN, defaultValue: 0},
    auto_submission: {type: Sequelize.BOOLEAN, defaultValue: 1},
    confirmation_token: {type: Sequelize.STRING, defaultValue: null, unique: true},
    confirmed_at: {type: Sequelize.DATE, defaultValue: null},
    confirmation_sent_at: {type: Sequelize.DATE, defaultValue: null},
    unconfirmed_email: {type: Sequelize.STRING, defaultValue: null},
    referral_credit: {type: Sequelize.DECIMAL(10,2), defaultValue: '0.00'}
  });
};