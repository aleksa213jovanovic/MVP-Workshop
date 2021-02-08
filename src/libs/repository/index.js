const UserRepository = require('./userRepository');
const UserEventStore = require('../event-store');
const reducers = require('../domain-model/reducers');

module.exports = new UserRepository(reducers, UserEventStore);