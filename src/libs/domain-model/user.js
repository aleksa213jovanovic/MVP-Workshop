const eventTypes = require('./eventTypes');

export function addSSN(params) {
  const {userID, ssn} = params;
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