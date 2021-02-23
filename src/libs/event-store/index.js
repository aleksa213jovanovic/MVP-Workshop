const userStore = require('./userStore');
const ViewDB = require('./view-db');
const EventDB = require('./event-db');

(
  async() => {
    try{
    await EventDB.init();
    }catch(err) {
      console.log(err)

      //TODO log this error
    }
  }
)();

(
  async() => {
    try{
      await ViewDB.init();
    }catch(err) {
      console.log(err)
    }
  }
)();


module.exports = new userStore(EventDB, ViewDB);