

class userEventStore {
  constructor(eventModel, viewModel) {
    this.eventModel = eventModel;
    this.viewModel = viewModel;
  }

  async getUserEventsByID(userID) {
    try {
      return await this.eventModel.find({ 'eventData.userId': userID }).exec();
    } catch (err) {
      throw err;
    }
  }

  async getUserViewByID(userID) {
    try {
      return await this.viewModel.find({ id: userID }).exec();
    } catch (err) {
      throw err;
    }
  }

  async updateUser(events, updatedUser) {
    const saveEvents = events.map((e) => {
      return {
        eventData: e
      }
    });
    try {
      await this.eventModel.create(saveEvents);
      const user = await this.viewModel.findOneAndUpdate({ id: updatedUser.id }, updatedUser).exec();
    } catch (err) {
      throw err;
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
      throw err;
    }
  }
}

module.exports = userEventStore;