
const UserEventStore = require('../event-store');

module.exports.queryHandler = async (params) => {
  const { userId } = params;
  try {
    const user = await UserEventStore.getUserViewByID(userId);
    return user[0]._doc.ssn;
  } catch (err) {

    //TODO ispravi ovo da baca QueryError ako userId ne postoji u bazi
    throw err;
  }
}