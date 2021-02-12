class userRepository {
  constructor(reducers, userEventStore) {
    this.reducers = reducers;
    this.userEventStore = userEventStore;
  }

  async save(events, user) {
    try{
      await this.userEventStore.saveNewUser(events, user);
    } catch(err) {
      console.log(err);
      return err;
    }
  }

  async update(events, user) {
    try {
      await this.userEventStore.updateUser(events, user);
    } catch (err) {
      console.log(err)
      return;
    }
  }

  async getByID(userId) {
    //izvlacim niz svih eventova preko event-store iz eventDB
    //pomocu reducera iz domain-modela taj niz rekonstruisem u model
    //vratim model i save funkciju
    let allEvents = {};
    try {
      allEvents = await this.userEventStore.getUserEventsByID(userId);
    } catch (err) {
      console.log(err);
      return;
    }
    if (allEvents.length == 0) {
      return null;
    }
    const events = allEvents.map((model) => model._doc.eventData)

    return this.reducers.reduceUserEvents(events)
  }

}

module.exports = userRepository;