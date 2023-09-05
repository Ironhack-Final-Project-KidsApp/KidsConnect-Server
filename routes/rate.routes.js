const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Rating = require("../models/Rating.model");
const router = express.Router();

//get request for the current rating of the user
router.get('/activity/:id/rating', isAuthenticated, async (req, res, next) => {
  try {
    const findUserRating = await Rating.findOne({
      activity: req.params.id,
      user: req.payload._id,
    });

    if (findUserRating) {
      res.status(200).json({ rate: findUserRating.rate });
    } else {
      res.status(200).json({ rate: 0 });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/activity/:id/rating', isAuthenticated, async (req, res, next) => {
    try {
      const findUserRating = await Rating.findOne({
        activity: req.params.id,
        user: req.payload._id,
      });
  
      if (findUserRating) {
        findUserRating.rate = req.body.rate;
        console.log('body rate', req.body.rate)
        const updatedRating = await findUserRating.save();
        res.status(200).json(updatedRating);
      } else {
        const makeRating = await Rating.create({
          activity: req.params.id,
          user: req.payload._id,
          rate: req.body.rate,
        });
        res.status(201).json(makeRating);
      }
    } catch (error) {
      next(error);
    }
  });
  
  
  //will get the average rating of certain activityID
  router.get('/activity/:id/avarageRating', async (req,res,next) => {
      try{
          const findActivity = await Rating.find({activity: req.params.id});
          if (findActivity.length === 0) {
            res.status(200).json({ result: 0 });
            return;
          }
          const averageRate = findActivity.map(target=> target.rate).reduce((a, b) => a + b, 0) / findActivity.length;
          res.status(200).json({ result: averageRate });
      }
      catch(error){
        next(error)}
  });

  module.exports = router;