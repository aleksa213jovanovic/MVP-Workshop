const addSSN = require('../domain-model')
const UserRepository = require('../repository');

module.exports = {
  handlers: [
    {
      AddUserSSN: async function (command) {
        //TODO validate command object with joi
        const { userID, payload } = command;
        try {
          const { userState, save } = await UserRepository.getByID(userID);
        } catch (err) {
          console.log(err);
          return;
        }
        const events = addSSN({
          user: userState,
          ssn: payload.SSN,
        });
        userState.ssn = payload.SSN;
        try {
          await save(events, userState);
        } catch (err) {
          console.log(err);
          return;
        }
      }
    }
  ]
}