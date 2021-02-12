const app = require('./src/app');
const mongoose = require("mongoose");
const preloadDB = require('./preloadDB');

mongoose.connect("mongodb://127.0.0.1:27017/mvp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


(async () => {
  try{
  await preloadDB(); 
  }catch(err) {
    console.log(err);
  }
})()




app.listen(8081, () => {
  console.log('Server running on 8081');
});