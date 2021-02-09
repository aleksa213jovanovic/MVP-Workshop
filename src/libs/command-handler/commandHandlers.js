const addSSN = require('../domain-model/user').addSSN
const UserRepository = require('../repository');

module.exports = {
  handlers: [
    {
      AddUserSSN: async function (command) {
        //TODO validate command object with joi
        const { userId, payload } = command;
        let userState, saveFunc
        try {
          const { userState, saveFunc } = await UserRepository.getByID(userId);
          if (userState == undefined) {
            throw new Error('there is no user with id ' + userId );
          }
          
          if(userState.ssn != undefined) {
            throw new Error('user already have ssn');
          }

          const events = addSSN({
            user: userState,
            ssn: payload.SSN,
          });
          userState.ssn = payload.SSN;
          await UserRepository.save(events, userState)
         // await saveFunc(events, userState).bind(UserRepository);

        } catch (err) {
          console.log(err);
          return;
        }
      }
    }
  ]
}