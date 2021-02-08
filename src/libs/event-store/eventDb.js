const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserEventSchema = new Schema({
  eventData: Object,
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("UserEvent", UserEventSchema);
