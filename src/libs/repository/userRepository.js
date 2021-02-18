class userRepository {
  constructor(reducers, userEventStore) {
    this.reducers = reducers;
    this.userEventStore = userEventStore;
  }

  async save(events, user) {
    try{
      await this.userEventStore.saveNewUser(events, user);
    } catch(err) {
      throw err;
    }
  }

  async update(events, user) {
    try {
      await this.userEventStore.updateUser(events, user);
    } catch (err) {
      throw err;
    }
  }

  async getByID(userId) {
    let allEvents = {};
    try {
      allEvents = await this.userEventStore.getUserEventsByID(userId);
    } catch (err) {
      throw err;
    }
    if (allEvents.length == 0) {
      return null;
    }
    const events = allEvents.map((model) => model._doc.eventData)

    return this.reducers.reduceUserEvents(events)
  }

}

module.exports = userRepository;