class DisconnectedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 503;
    this.message = message;
  }
}

module.exports = DisconnectedError;
