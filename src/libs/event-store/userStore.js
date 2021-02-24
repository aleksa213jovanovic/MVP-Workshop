class userStore {
  constructor(EventDB, ViewDB) {
    this.EventDB = EventDB;
    this.ViewDB = ViewDB;
  }

  async getUserEventsByID(userId) {
    try {
      return await this.EventDB.getEventsByUserID(userId);
    } catch (err) {
      throw err;
    }
  }

  async getUserViewByID(userId) {
    try {
      return  await this.ViewDB.getUserById(userId);
    } catch (err) {
      throw err;
    }
  }


  async updateUser(events, updatedUser) {
    try {
      await this.EventDB.appendEventList(events);
      await this.ViewDB.updateUser(updatedUser);
    } catch (err) {
      throw err;
    }
  }


  async saveNewUser(events, newUser) {
    try {
      await this.EventDB.appendEventList(events);
      await this.ViewDB.addNewUser(newUser);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = userStore;