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
    const user = await User.findById(id).populate({
      path : 'favorite',
      populate : {path : 'author'}
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const { image, favorite } = user;
    res.json({ image: image, favorite: favorite });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/user/:id/activity', async (req, res) => {
  const { id } = req.params;
  try{
    const userActivity = await Activity.find({author: id}).sort('-date').populate('author');
    res.status(200).json(userActivity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

//get users favorites:
router.get('/user/:userId/favorites', isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    console.log('user', user)
    const favoriteActivityIds = user.favorite;
    console.log('favorites', favoriteActivityIds )
    res.status(200).json(favoriteActivityIds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add favorite route
router.post('/user/:activityId/addfavorite', isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const user = await User.findById(userId);
    const activityId = req.params.activityId;
    const activity = await Activity.findById(activityId);

    if (!user.favorite.includes(activityId)) {
      user.favorite.push(activityId);
      await user.save();
    }

    res.status(200).json({ message: 'Added as favorite' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete favorite route
router.delete('/user/:activityId/removefavorite', isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const user = await User.findById(userId);
    const activityId = req.params.activityId;
    const activity = await Activity.findById(activityId);
    
    if (user.favorite.includes(activityId)) {
      user.favorite.pull(activityId);
      await user.save();
    }

    res.status(200).json({ message: 'Removed from favorites' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;