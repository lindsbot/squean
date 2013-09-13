'use strict';

var Sequelize = require('sequelize');
var sequelize = new Sequelize('phantomrunner', 'root', 'plantlife');

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

var Races = sequelize.define('Races',{
  id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
  name: { type: Sequelize.STRING, allowNull: false},
  registration_opens_at: { type: Sequelize.DATE, defaultValue: null},
  registration_closes_at: { type: Sequelize.DATE, defaultValue: null},
  event_starts_at: { type: Sequelize.DATE, defaultValue: null},
  event_ends_at: { type: Sequelize.DATE, defaultValue: null},
  created_at: { type: Sequelize.DATE, allowNull: false},
  updated_at: { type: Sequelize.DATE, allowNull: false},
  results_manually_published_at: { type: Sequelize.DATE, defaultValue: null},
  autopublish_results_after_days: { type: Sequelize.INTEGER, defaultValue: null},
  main_image_file_name: { type: Sequelize.STRING, defaultValue: null},
  main_image_content_type: { type: Sequelize.STRING, defaultValue: null},
  main_image_file_size: { type: Sequelize.INTEGER, defaultValue: null},
  main_image_updated_at: { type: Sequelize.DATE, defaultValue: null},
  description: { type: Sequelize.TEXT},
  show_normalized_results: { type: Sequelize.INTEGER, defaultValue: null},
  course_uphill_ft: { type: Sequelize.FLOAT, defaultValue: 0},
  course_downhill_ft: { type: Sequelize.FLOAT, defaultValue: 0},
  course_starting_altitude_ft: { type: Sequelize.FLOAT, defaultValue: 0},
  course_temp_f: { type: Sequelize.FLOAT, defaultValue: 60},
  early_registration_fee: { type: Sequelize.DECIMAL(10,2), defaultValue: null},
  registration_fee: { type: Sequelize.DECIMAL(10,2), defaultValue: null},
  early_registration_deadline: { type: Sequelize.DATE, defaultValue: null},
  manager_id: { type: Sequelize.INTEGER, defaultValue: null},
  wizard_step: { type: Sequelize.INTEGER, defaultValue: null},
  custom_waiver: { type: Sequelize.STRING, defaultValue: null},
  public: { type: Sequelize.BOOLEAN, defaultValue: null},
  organizer_name: { type: Sequelize.STRING, defaultValue: null},
  organizer_email: { type: Sequelize.STRING, defaultValue: null},
  organizer_website: { type: Sequelize.STRING, defaultValue: null},
  facebook_url: { type: Sequelize.STRING, defaultValue: null},
  twitter_url: { type: Sequelize.STRING, defaultValue: null},
  short_description: { type: Sequelize.STRING, defaultValue: null},
  charity_name: { type: Sequelize.STRING, defaultValue: null},
  direct_donation_url: { type: Sequelize.STRING, defaultValue: null},
  third_party: { type: Sequelize.BOOLEAN, defaultValue: 0},
  credit_card_fee_included: { type: Sequelize.BOOLEAN, defaultValue: 0},
  conversion_credit: { type: Sequelize.DECIMAL(10,2), defaultValue: 0.00},
});




module.exports = {
    Users: Users,
    Races: Races
};