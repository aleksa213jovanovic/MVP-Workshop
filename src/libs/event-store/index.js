const userEventStore = require('./userEventStore');
const eventModel = require('./eventDb');
const viewModel = require('./viewDb');

module.exports = new userEventStore(eventModel, viewModel);