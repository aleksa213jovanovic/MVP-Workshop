class userRepository {
  constructor(reducers, userEventStore) {
    this.reducers = reducers;
    this.userEventStore = userEventStore;
  }

  //TODO save treba preko event-store da se odvija
  async save(events, user) {
    try{
      await this.userEventStore.save(events, user);
    } catch(err) {
      console.log(err)
      return;
    }
  }

  async getByID(userID) {
    //izvlacim niz svih eventova preko event-store iz eventDB
    //pomocu reducera iz domain-modela taj niz rekonstruisem u model
    //vratim model i save funkciju
    const allEvents = await this.userEventStore.getUserEventsByID(userID);
    return allEvents
  }

}

module.exports = userRepository;