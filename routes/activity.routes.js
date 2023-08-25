const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Activity = require("../models/Activity.model");
const Rating = require("../models/Rating.model");
const router = express.Router();

//post an activity
router.post('/activity', isAuthenticated, async (req, res, next) => {
  try{
    const createdActivity = await Activity.create(req.body);
    res.status(201).json({ createdActivity });
  }
  catch(error){
    next(error);
  }
});

//find all the activity
router.get('/activity', async (req, res, next) => {
  try{
    const foundActivity = await Activity.find();
    res.status(200).json({ foundActivity });
  }
  catch(error){
    next(error);
  }
});

//find the activity
router.get('/activity/:id', async (req,res,next) => {
    try{
        const oneActivity = await Activity.findById(req.params.id);
        res.status(200).json({ oneActivity });
    }
    catch(error){next(error)}
})

//will post an activity
router.post('/activity/:id', async (req,res,next) => {
    try{
        await Activity.findByIdAndUpdate(req.params.id, req.body);
        const editedActivity = await Activity.findById(req.params.id);
        res.status(201).json({ editedActivity });
    }
    catch(error){next(error)}
})


//the user will post their rating
router.post('/activity/:id/rating', isAuthenticated, async (req,res,next) => {
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
})

//will get the average rating of certain activityID
router.get('/activity/:id/rating', async (req,res,next) => {
    try{
        const findActivity = await Rating.find({activity: req.params.id});
        const averageRate = findActivity.map(target=> target.rate).reduce((a, b) => a + b, 0) / findActivity.length
        res.status(200).json({ result: averageRate });
    }
    catch(error){next(error)}
})

module.exports = router;
