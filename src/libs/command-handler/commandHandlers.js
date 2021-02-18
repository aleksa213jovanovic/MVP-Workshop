const addSsn = require('../domain-model/user').addSsn
const addUser = require('../domain-model/user').addUser;
const UserRepository = require('../repository');

//TODO validate command object with joi

module.exports = {
  handlers: [
    {
      UserAdd: async function (command) {
        const { userId, payload } = command;
        try {
          let userState = {}
          userState = await UserRepository.getByID(userId);

          const events = addUser({ currentUserState: userState, userId: userId, name: payload.name, email: payload.email });
          
          const newUser = {
            id: userId,
            name: payload.name,
            email: payload.email,
          }
          await UserRepository.save(events, newUser);

        } catch (err) {
          throw err;
        }
      }
    },
    {
      UserAddSsn: async function (command) {
        const { userId, payload } = command;
        try {
          let userState = {};
          userState = await UserRepository.getByID(userId);

          const events = addSsn({
            currentUserState: userState,
            ssn: payload.ssn,
          });

          userState.ssn = payload.ssn;
          await UserRepository.update(events, userState)

        } catch (err) {
          throw err;
        }
      }
    }
  ]
}