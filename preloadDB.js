const userModel = require('./src/libs/event-store/viewDb');
const eventModel = require('./src/libs/event-store/eventDb');

module.exports = async () => {
  event1 = {
    type: 'UserAdded',
    userId: '1',
    name: 'Alex',
    email: '@gmail.com'
  }
  event2 = {
    type: 'UserAdded',
    userId: '2',
    name: 'mina',
    email: 'mina@gmail.com'
  }
  const users = [userModel.create({id: '1', name: 'Alex', email: '@gmail.com'}), userModel.create({id: '2', name: 'mina', email: 'mina@gmail.com'})]
  const events = [ eventModel.create({eventData: event1}), eventModel.create({eventData: event2})]

  try {
    Promise.all(users)
    Promise.all(events)
  } catch (err) {
    console.log(err)
    return
  }
}