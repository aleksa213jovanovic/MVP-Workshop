const DomainError = require('../libs/domain-model/domain-error');
const ValidationError = require('../libs/command-handler/validation-error');
const ClientError = require('../rest-api/client-error');
const { format, createLogger, transports } = require('winston');

const logger = createLogger({
  transports: [
    new transports.File({
      filename: 'error.log',
      level:'error',
      format: format.combine(
        format.timestamp(),
        format.json()
      )
    }),
  ]
});

module.exports = async function errorHandler(err, req, res, next) {
  logger.error({message: err})      
  if(err instanceof DomainError || err instanceof ValidationError || err instanceof ClientError) {
    res.status(err.httpCode);
    res.send(err.clientMessage);
  } else {
    res.status(500);
    res.send('Internal server error')
  }
}