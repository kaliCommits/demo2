const CustomError = require("./CustomError");

class NotAuthenticate extends CustomError {
  statusCode = 200;
  str;
  constructor(msg) {
    super(msg);
    this.str = msg;
    Object.setPrototypeOf(this, NotAuthenticate.prototype);
  }
  serializeError() {
    return [{ msg: this.str }];
  }
}

module.exports = NotAuthenticate;
