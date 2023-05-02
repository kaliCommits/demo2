const NotAuthenticate = require("../errors/NotAuthenticate");

const requireAuth = (req, res, next) => {
  if (!req.currentUser) {
    return next(new NotAuthenticate("not authenticated"));
  }
  next();
};

module.exports = requireAuth;
