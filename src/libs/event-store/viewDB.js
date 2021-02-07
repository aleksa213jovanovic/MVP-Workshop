const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserViewSchema = new Schema({
  id: String,
  name: String,
  ssn: String,
  createdAt: {type: Date, default:Date.now}
});

module.exports.UserViewModel = mongoose.model("UserView", UserViewSchema);