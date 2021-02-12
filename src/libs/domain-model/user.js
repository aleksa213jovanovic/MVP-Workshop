const eventTypes = require('./eventTypes').eventTypes;


module.exports.addSsn = (params) => {
  const { user, ssn } = params;
  const event = eventTypes.find((e) => e.type === 'UserAddedSsn');
  event.userId = user.id
  event.ssn = ssn
  return [
    event
  ]
}

module.exports.addUser = (params) => {
  const { userId, name, email } = params;
  const event = eventTypes.find((e) => e.type === 'UserAdded');
  event.userId = userId;
  event.name = name;
  event.email = email;
  return [
    event
  ]
}


