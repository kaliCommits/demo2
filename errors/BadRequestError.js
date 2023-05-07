const CustomError = require("./CustomError");

class BadRequestError extends CustomError {
  statusCode = 400 ;
  str;
  constructor(msg) {
    super(msg);
    this.str = msg;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serializeError() {
    return [{ msg: this.str }];
  }
}

module.exports = BadRequestError;
