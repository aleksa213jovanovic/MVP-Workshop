const eventTypes = require('./eventTypes').eventTypes;


module.exports.addSSN =  (params) => {
  const {user, ssn} = params;
  if(user.ssn != null) {
    throw new Error('User already have ssn');
  }

  const event = eventTypes.find((e) => e.type==='UserAddedSSN');
  event.userId = user.id
  event.SSN = ssn
  return [
    event
  ]
}