

class userEventStore {
  constructor(eventModel, viewModel) {
    this.eventModel = eventModel;
    this.viewModel = viewModel;
  }

  async getUserEventsByID(userID) {
    // const query = this.eventModeel.find();
    //query.where('eventData.userId').eq(userID);
    return await this.eventModel.find({ 'eventData.userId': userID }).exec();
  }

  async getUserViewByID(userID) {
    try {
      return await this.viewModel.find({id: userID}).exec();
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async updateUser(events, newUser) {
    const saveEvents = events.map((e) => {
      return {
        eventData: e
      }
    });
    try {
      await this.eventModel.create(saveEvents);
      const user = await this.viewModel.findOneAndUpdate({ id: newUser.id }, newUser).exec();
    } catch (err) {
      console.log(err)
      return;
    }
  }


  async saveNewUser(events, newUser) {
    const saveEvents = events.map((e) => {
      return {
        eventData: e
      }
    });
    try {
      await this.eventModel.create(saveEvents);
      await this.viewModel.create(newUser);
    } catch (err) {
      console.log(err);
      return;
    }
  }
}

module.exports = userEventStore;