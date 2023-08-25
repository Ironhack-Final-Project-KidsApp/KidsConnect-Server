const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Activity = require("../models/Activity.model");
const Rating = require("../models/Rating.model");
const router = express.Router();

//1-create an activity
router.post('/activity', isAuthenticated, async (req, res, next) => {
  try{
    const createdActivity = await Activity.create(req.body);
    res.status(201).json({ createdActivity });
  }
  catch(error){
    next(error);
  }
});

//2-find all the activities
router.get('/activity', async (req, res, next) => {
  try{
    const foundActivity = await Activity.find();
    res.status(200).json({ foundActivity });
  }
  catch(error){
    next(error);
  }
});

//3-find one activity
router.get('/activity/:id', async (req,res,next) => {
    try{
        const oneActivity = await Activity.findById(req.params.id);
        res.status(200).json({ oneActivity });
    }
    catch(error){
      next(error)}
});

//4-edit an activity
/* router.post('/activity/:id', async (req,res,next) => {
    try{
        await Activity.findByIdAndUpdate(req.params.id, req.body);
        const editedActivity = await Activity.findById(req.params.id);
        res.status(201).json({ editedActivity });
    }
    catch(error){next(error)}
}) */
router.put('/activity/:id', async (req, res, next) => {
  try {
    const editedActivity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(201).json({ editedActivity });
  } catch (error) {
    next(error);
  }
});

//delete an activity - only by the admin?? - create a admin middleware?
router.delete('/activity/:id', async (req, res, next) => {
  try {
    const deletedActivity = await Activity.findByIdAndDelete(
      req.params.id,
      req.body
    );
    res.status(200).json({ deletedActivity });
  } catch (error) {
    next(error);
  }
})

//these routes should be in a rating.routes?
//5-the user will post their rating
/* router.post('/activity/:id/rating', isAuthenticated, async (req,res,next) => {
    try{
        const findUser = await Rating.find({activity: req.params.id, user: req.payload._id});
        if(findUser.length > 0){
            res.status(400).json({ message: 'user already rated' });
            return;
        }
        else{
            const makeRating = await Rating.create({
                activity: req.params.id,
                user: req.payload._id,
                rate: req.body.rate,
            });
            res.status(201).json({ makeRating });
        }
    }
    catch(error){next(error)}
}) */
router.post('/activity/:id/rating', isAuthenticated, async (req, res, next) => {
  try {
    const findUserRating = await Rating.findOne({
      activity: req.params.id,
      user: req.payload._id,
    });

    if (findUserRating) {
      // User has already rated, so update the existing rating
      findUserRating.rate = req.body.rate;
      const updatedRating = await findUserRating.save();
      res.status(200).json({ updatedRating });
    } else {
      // User hasn't rated before, create a new rating
      const makeRating = await Rating.create({
        activity: req.params.id,
        user: req.payload._id,
        rate: req.body.rate,
      });
      res.status(201).json({ makeRating });
    }
  } catch (error) {
    next(error);
  }
});


//will get the average rating of certain activityID
router.get('/activity/:id/rating', async (req,res,next) => {
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
