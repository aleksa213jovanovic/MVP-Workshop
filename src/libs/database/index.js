const ViewDB = require('../database/view-db');
const EventDB = require('../database/event-db');

(
  async() => {
    try{
    await EventDB.init();
    }catch(err) {
      console.log(err)
      process.exit(1)
    }
  }
)();

(
  async() => {
    try{
      await ViewDB.init();
    }catch(err) {
      console.log(err)
      process.exit(1)
    }
  }
)();

module.exports.EventDB = EventDB;
module.exports.ViewDB = ViewDB;