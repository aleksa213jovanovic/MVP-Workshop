const app = require('./src/app');
const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/mvp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); 
app.listen(8081, () => {
  console.log('Server running on 8081');
});