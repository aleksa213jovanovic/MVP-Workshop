class userRepository {
  constructor(reducers, UserStore) {
    this.reducers = reducers;
    this.UserStore = UserStore;
  }

  async save(events, user) {
    try{
      await this.UserStore.saveNewUser(events, user);
    } catch(err) {
      throw err;
    }
  }

  async update(events, user) {
    try {
      await this.UserStore.updateUser(events, user);
    } catch (err) {
      throw err;
    }
  }

  async getCurrentUserStateById(userId) {
    let allEvents = {};
    try {
      allEvents = await this.UserStore.getUserEventsByID(userId)
    } catch (err) {
      throw err;
    }
    if (allEvents.length == 0) {
      return null;
    }    
    return this.reducers.reduceUserEvents(allEvents)
  }

}

module.exports = userRepository;