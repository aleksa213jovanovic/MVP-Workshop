const router = require('./src/rest-api/router');
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/mvp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

router.listen(8081, () => {
  console.log('Server running on 8081');
});