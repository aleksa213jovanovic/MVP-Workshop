class userRepository {
  constructor(reducers, userEventModel, userViewModel) {
    this.reducers = reducers;
    this.userEventModel = userEventModel;
    this.userViewModel = userViewModel;
  }

  async save(events, user) {
    const eventsSave = events.map((e) => new this.userEventModel({eventData: e}));
    eventsSave.array.forEach(e => {
      e.save((err) => {
        if(err) {
          console.log(err);
          return;
        }
      })
    });
    const userSave = new this.userViewModel({id: user.id, name: user.name, ssn: user.ssn});
    userSave.save();
  }

  async getByID(userID) {
    //izvlacim niz svih eventova preko event-store iz eventDB
    //pomocu reducera iz domain-modela taj niz rekonstruisem u model
    //vratim model i save funkciju
  }

}