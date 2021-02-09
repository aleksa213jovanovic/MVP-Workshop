

class userEventStore {
  constructor(eventModel, viewModel) {
    this.eventModel = eventModel;
    this.viewModel = viewModel;
  }

  async getUserEventsByID(userID) {
   // const query = this.eventModeel.find();
    //query.where('eventData.userId').eq(userID);
    return await this.eventModel.find({'eventData.userId': userID}).exec();
  }

  async getUserViewByID(userID) {
    try{
      return await this.viewModel.findById(userID).exec();
    } catch(err) {
      console.log(err);
      return;
    }
  }

  async updateUser(events, newUser) {
    try{
      await this.eventModel.create(events);
      const user = await this.viewModel.findOneAndUpdate({id: newUser.id}, newUser).exec();
      await user.save();
    } catch(err) {
      console.log(err)
      return;
    }
  }
}

module.exports = userEventStore;