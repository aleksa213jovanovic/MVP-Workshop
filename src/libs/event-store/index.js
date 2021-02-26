const userStore = require('./userStore');
const ViewDB = require('../database').ViewDB;
const EventDB = require('../database').EventDB;

module.exports = new userStore(EventDB, ViewDB);