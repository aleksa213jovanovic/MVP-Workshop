

class userEventStore {
  constructor(eventModel, viewModel) {
    this.eventModel = eventModel;
    this.viewModel = viewModel;
  }

  async getUserEventsByID(userID) {
    const query = this.eventModel.find();
    query.where('eventData.userId').eq(userID);
    return await query.exec();
  }

  async getUserViewByID(userID) {
    try{
      return await this.viewModel.findById(userID).exec();
    } catch(err) {
      console.log(err);
      return;
    }
  }

  async save(events, user) {
    try{
      await this.eventModel.create(events);
      await this.viewModel.create(user);
    } catch(err) {
      console.log(err)
      return;
    }
  }


}

module.exports = userEventStore;