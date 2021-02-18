const DomainError = require('../libs/domain-model/domain-error');

module.exports = async function errorHandler(err, req, res, next) {
  //TODO log error
  console.error(err);
  if(err instanceof DomainError) {
    res.status(err.httpCode);
    res.send(err.clientMessage);
  } else {
    res.status(500);
    res.send('Internal server error')
  }
}