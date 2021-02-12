const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserViewSchema = new Schema({
  id: String,
  name: String,
  email: String,
  ssn: String,
  createdAt: {type: Date, default:Date.now}
});

module.exports = mongoose.model("UserView", UserViewSchema);