const express = require("express");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config");
const Activity = require("../models/Activity.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post('/upload-activity-image', fileUploader.single('activityImage'), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded for activity!'));
    return;
  }
  res.json({ fileUrl: req.file.path });
});


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
    const foundActivities = await Activity.find().sort('-date').populate('author');
    res.status(200).json(foundActivities);

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