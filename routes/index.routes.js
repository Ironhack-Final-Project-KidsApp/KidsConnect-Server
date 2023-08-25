const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Activity = require("../models/Activity.model");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});


module.exports = router;
