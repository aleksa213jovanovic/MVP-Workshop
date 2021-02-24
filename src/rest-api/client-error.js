class ClientError extends Error {
  constructor(clientMessage, httpCode, description) {
    super(description)
    this.clientMessage = clientMessage;
    this.httpCode = httpCode;
    Error.captureStackTrace(this);
  }
}

module.exports = ClientError;