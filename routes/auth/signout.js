const express = require("express");
const router = express.Router();

router.post("/api/v1/signout", (req, res, next) => {
  req.session = null;
  res.send({status:"success"});
});

module.exports = router;