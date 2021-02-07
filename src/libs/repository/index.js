const UserRepository = require('./userRepository');
const UserViewModel = require('../event-store/viewDB');
const UserEventModel = require('../event-store/eventDB');

const reducers = require('../domain-model/reducers');

module.exports = new UserRepository(reducers, UserEventModel, UserViewModel);