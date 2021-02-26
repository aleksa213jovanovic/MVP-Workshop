const eventTypes = require('./eventTypes').eventTypes;
const DomainError = require('./domain-error');


module.exports.addUser = (params) => {
  const { currentUserState, userId, name, email } = params;
  if (currentUserState != null) {
    const clientMessage = 'Error: user already exists with id ' + userId
    throw new DomainError(clientMessage, 400, 'Client ' + clientMessage)
  }
  const event = eventTypes.find((e) => e.type === 'UserAdded');
  event.userId = userId;
  event.name = name;
  event.email = email;
  return [
    event
  ]
}

module.exports.addSsn = (params) => {
  const { currentUserState, ssn } = params;
  if (currentUserState == null) {
    const clientMessage = 'Error: there is no user with id ' + userId
    throw new DomainError(clientMessage, 404, 'Client ' + clientMessage);
  }

  if (currentUserState.ssn != undefined) {
    const clientMessage = 'Error: user already have ssn';
    throw new DomainError(clientMessage, 400, 'Client ' + clientMessage);
  }
  const event = eventTypes.find((e) => e.type === 'UserAddedSsn');
  event.userId = currentUserState.id
  event.ssn = ssn
  return [
    event
  ]
}
