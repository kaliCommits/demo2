class CustomError extends Error {
  statusCode;
  errors;
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  //   serializeError()
}

module.exports = CustomError;
