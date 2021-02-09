class userRepository {
  constructor(reducers, userEventStore) {
    this.reducers = reducers;
    this.userEventStore = userEventStore;
  }

  //TODO save treba preko event-store da se odvija
  async save(events, user) {
    try{
      await this.userEventStore.updateUser(events, user);
    } catch(err) {
      console.log(err)
      return;
    }
  }

  async getByID(userId) {
    //izvlacim niz svih eventova preko event-store iz eventDB
    //pomocu reducera iz domain-modela taj niz rekonstruisem u model
    //vratim model i save funkciju
    const allEvents = await this.userEventStore.getUserEventsByID(userId);
    if(allEvents == undefined) {
      throw new Error('There is no user with id ' + userId)
    }
    const events = allEvents.map((model) => model._doc.eventData)
    //console.log(events)
    
    return { userState: await this.reducers.reduceUserEvents(events), saveFunc: this.save};
  }

}

module.exports = userRepository;