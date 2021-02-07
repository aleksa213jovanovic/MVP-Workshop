const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserEventSchema = new Schema({
  eventData: Object,
  createdAt: {type: Date, default: Date.now}
});

module.exports.UserEventModel = mongoose.model("UserEvent", UserEventSchema);
