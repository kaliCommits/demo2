const { validationResult } = require("express-validator");
const ReqValidationError = require("../errors/ReqValidationError");

const reqValidation = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    throw new ReqValidationError(errors);
  }
  next();
};

module.exports = reqValidation;
