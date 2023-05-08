const express = require("express");
const router = express.Router();
const currentUserMid = require("../../middleware/current-user");
// const requireAuth = require("../../middleware/require-auth");

router.get(
  "/api/v1/currentuser",
  currentUserMid,
  // requireAuth,
  (req, res) => {
    res.send(req.currentUser || null);
  }
);

module.exports = router;