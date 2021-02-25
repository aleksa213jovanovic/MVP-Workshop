const ViewDB = require('../database/view-db');
const EventDB = require('../database/event-db');

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

module.exports.EventDB = EventDB;
module.exports.ViewDB = ViewDB;