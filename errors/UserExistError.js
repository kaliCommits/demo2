const CustomError = require("./CustomError");

class UserExistError extends CustomError {
  statusCode = 200; //beacuse al tech compienes handle this way althrough we can do 409->conflicr it is not http protocol level conflict rather it is logical level application lecvel
  str;
  constructor(message) {
    super(message);
    this.str = message;
    Object.setPrototypeOf(this, UserExistError.prototype);
  }
  serializeError() {
    return [{ msg: this.str }];
  }
}

module.exports = UserExistError;
