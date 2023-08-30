const express = require("express");
const router = express.Router();

// Require the User model in order to interact with the database
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");

//route for cloudinary upload image
router.post("/upload", fileUploader.single("image"), (req, res, next) => {
  console.log("file is: ", req.file)
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ fileUrl: req.file.path });
});

router.put("/user-image", (req, res) => {
  //console.log("req body is:", req.body )
  const { id, image } = req.body;
  
  User.findByIdAndUpdate(id, { image: image }, {new: true})
    .then(updatedUser => {
      console.log("updated User is:", updatedUser)
      res.json( {updatedUser: {id, image}} )
    })
    .catch(err => console.error(err))
})

router.get("/user/:id", async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)
    const { image } = user;
    res.json(image)
})
module.exports = router;