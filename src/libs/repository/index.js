const UserRepository = require('./userRepository');
const UserStore = require('../event-store');
const reducers = require('../domain-model/reducers');

module.exports = new UserRepository(reducers, UserStore);