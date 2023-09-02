const express = require("express");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config");
const User = require("../models/User.model");
const Activity = require("../models/Activity.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post('/upload', fileUploader.single('image'), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.json({ fileUrl: req.file.path });
});

router.put('/user-image', async (req, res) => {
  try {
    const { id, image } = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, { image: image }, {new: true});
    res.json({ updatedUser: { id, image } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const { image } = user;
    res.json({ image: image });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/user/:id/activity', async (req, res) => {
  const { id } = req.params;
  try{
    const userActivity = await Activity.find({author: id}).populate('author');
    res.status(200).json(userActivity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

//get users favorites:
router.get('/user/:id/favorites', async (req, res, next) => {
  const { id } = req.params;
  try {
    const userFavorites = await User.find({ favorites: id });
    res.status(200).json(userFavorites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//add or delete favorites route
router.post('/user/:id/addfavorite/:activityId', isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
  
    const activityId = req.params.activityId; 
    /* const activity = await User.find({_id: userId, favorite: activityId}); */

    if (user.favorite.includes(activityId)) {
      user.favorite.pull(activityId);
      await user.save();
      res.status(200).json({ message: 'Removed from favorites' });
    } else {
      user.favorite.push(activityId);
      await user.save();
      res.status(200).json({ message: 'Marked as favorite' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;