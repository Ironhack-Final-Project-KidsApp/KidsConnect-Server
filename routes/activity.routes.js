const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Activity = require("../models/Activity.model");
const router = express.Router();

//1-create an activity
router.post('/activity', isAuthenticated, async (req, res, next) => {
  try{
    const createdActivity = await Activity.create(req.body);
    res.status(201).json(createdActivity);
  }
  catch(error){
    next(error);
  }
});

//2-find all the activities
router.get('/activity', async (req, res, next) => {
  try{
    const foundActivity = await Activity.find();
    res.status(200).json(foundActivity);
  }
  catch(error){
    next(error);
  }
});

//3-find one activity
router.get('/activity/:id', async (req,res,next) => {
    try{
        const oneActivity = await Activity.findById(req.params.id).populate('author');
        res.status(200).json(oneActivity);
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


module.exports = router;
