const CustomError = require("./CustomError");

class ReqValidationError extends CustomError {
  statusCode = 200;
  errors;
  constructor(error) {
    super("Req parameter is not as expected");
    this.errors = error;
    Object.setPrototypeOf(this, ReqValidationError.prototype);
  }
  serializeError() {
    return this.errors.errors.map((err) => {
      return { msg: err.msg, field: err.param };
    });
  }
}

module.exports = ReqValidationError;
