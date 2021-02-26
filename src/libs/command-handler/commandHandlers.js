const addSsn = require('../domain-model/user').addSsn
const addUser = require('../domain-model/user').addUser;
const UserRepository = require('../repository');
const validateUserAdd = require('./joi-validators').userAddSchema;
const validateUserAddSsn = require('./joi-validators').UserAddSsnSchema;
const ValidationError = require('./validation-error');

module.exports = {
  handlers: [
    {
      UserAdd: async function (command) {
        const valid = validateUserAdd.validate(command);
        if(valid.error) {
          throw new ValidationError("Error " + valid.error.message, 400, "Client : " + valid.error);
        }        

        const { userId, payload } = command;
        try {
          let userState = {}
          userState = await UserRepository.getCurrentUserStateById(userId);

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
        const valid = validateUserAddSsn.validate(command);
        if(valid.error) {
          throw new ValidationError("Error " + valid.error.message, 400, "Client : " + valid.error);
        }

        const { userId, payload } = command;
        try {
          let userState = {};
          userState = await UserRepository.getCurrentUserStateById(userId);

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