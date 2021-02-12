const addSsn = require('../domain-model/user').addSsn
const addUser = require('../domain-model/user').addUser;
const UserRepository = require('../repository');

//TODO izbaci iz hendlera dohvatanje userStejta u zasebnu funkciju da 
//se kod ne bi ponavljao

module.exports = {
  handlers: [
    {
      UserAdded: async function (command) {
        const { userId, payload } = command;
        try {
          userState = await UserRepository.getByID(userId);
        } catch (err) {
          console.log(err);
          return;
        }

        if (userState != null) {
          throw new Error('User already exists with id ', userId)
        }

        events = addUser({userId: userId, name: payload.name, email: payload.email});
        const newUser = {
          id: userId,
          name: payload.name,
          email: payload.email,
        }

        try{ 
          await UserRepository.save(events, newUser);
        } catch(err) {
          console.log(err)
          return;
        }
      }
    },
    {
      UserAddedSsn: async function (command) {
        //TODO validate command object with joi
        const { userId, payload } = command;
        let userState = {};
        try {
          userState = await UserRepository.getByID(userId);
        } catch (err) {
          console.log(err);
          return;
        }

        if (userState == null) {
          throw new Error('there is no user with id ' + userId);
        }

        if (userState.ssn != undefined) {
          throw new Error('user already have ssn');
        }

        const events = addSsn({
          user: userState,
          ssn: payload.ssn,
        });

        userState.ssn = payload.ssn;
        try {
          await UserRepository.update(events, userState)
        } catch (err) {
          console.log(err);
          return;
        }
      }
    }
  ]
}