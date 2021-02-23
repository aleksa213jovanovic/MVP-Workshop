const UserStore = require('../event-store');

module.exports.queryHandler = async (params) => {
  const { userId } = params;
  try {
    const user = await UserStore.getUserViewByID(userId);
    return user.ssn;
  } catch (err) {

    //TODO ispravi ovo da baca QueryError ako userId ne postoji u bazi
    throw err;
  }
}