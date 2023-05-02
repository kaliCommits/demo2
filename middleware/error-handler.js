const CustomError = require("../errors/CustomError");

const errorHandler = (err, req, res, next) => {
  console.log("inside errorHandler middlware");
  if (err instanceof CustomError) {
    res.status(err.statusCode).send(err.serializeError());
  }
  next();
};

module.exports = errorHandler;
