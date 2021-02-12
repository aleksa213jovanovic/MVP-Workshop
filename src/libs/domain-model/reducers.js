

module.exports.reduceUserEvents = (events) => {
  if (events == undefined) {
    throw new Error('Error: reducer will accept only a list of events')
  }
  const userState = {
    id: null,
    name: null,
    email: null,
    ssn: null
  }
  events.forEach(e => {
    switch (e.type) {
      case 'UserAddedSsn':
        {
          userState.ssn = e.ssn;
        }
        break;
      case 'UserAdded':
        {
          userState.id = e.userId;
          userState.name = e.name;
          userState.email = e.email;
        }
        break;
      default: {
        throw new Error('Unknown event type in user reducer ' + e.type)
      }
    }
  });
  if(userState.id === null) {
    throw new Error('Internal error in reducer.')
  }
  return userState;
}
