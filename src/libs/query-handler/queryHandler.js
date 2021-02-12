
const UserEventStore = require('../event-store');

module.exports.queryHandler = async (params) => {
  const {userId} = params;
  const user = await UserEventStore.getUserViewByID(userId);
  return user[0]._doc.ssn;
}