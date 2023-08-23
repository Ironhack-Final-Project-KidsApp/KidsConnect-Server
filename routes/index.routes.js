const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Activity = require("../models/Activity.model");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post('/activity', isAuthenticated, async (req, res, next) => {
  try{
    const createdActivity = await Activity.create(req.body);
    res.status(201).json({ createdActivity: createdActivity });
  }
  catch(error){
    next(error);
  }
});

router.get('/activity', async (req, res, next) => {
  try{
    const foundActivity = await Activity.find();
    res.status(201).json({ foundActivity: foundActivity });
  }
  catch(error){
    next(error);
  }
});

module.exports = router;
