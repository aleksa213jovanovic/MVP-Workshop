const QueryError = require('./query-error');
const ViewDB = require('../database').ViewDB;

module.exports.queryHandler = async (params) => {
  const { userId } = params;
  try {
    const user = await ViewDB.getUserById(userId);
    if(user == undefined) {
      throw new QueryError('Error: there is no user with id ' + userId, 400, 'Client error: there is no user with id ' + userId)
    }
    return user.ssn;
  } catch (err) {

    throw err;
  }
}