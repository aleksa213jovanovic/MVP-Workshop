const router = require('./src/rest-api/router');

router.listen(8081, () => {
  console.log('Server running on 8081');
});