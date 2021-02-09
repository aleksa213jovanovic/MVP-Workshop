

module.exports.reduceUserEvents = (events) => {
  if (events == undefined) {
    throw new Error('Error: reducer will accept only a list of events')
  }
  const userState = {
    id: null,
    name: null,
    ssn: null
  }
  events.forEach(e => {
    switch (e.type) {
      case 'UserAddedSSN':
        {
          userState.id = e.userId;
          userState.name = e.name;
          userState.ssn = e.SSN;
        }
      default: {
        if (e != undefined) {
          userState.id = e.userId
          userState.name = e.name
        }
      }
    }
  });
  console.log(userState)
  return userState;
}
