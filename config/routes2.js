'use strict';

var passport = require('passport');
var request = require('request');
var apis = require('./api.js');
var ensureLoggedIn = require('connect-ensure-login');
var users = require('../controllers/users');
var pass = require('./passport.js');
var _ = require('underscore');
var db = require('./models/db.js');
var LocalStrategy = require('passport-local').Strategy;


