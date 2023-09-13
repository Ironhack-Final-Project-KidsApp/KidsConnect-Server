const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
 

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    if (file.fieldname === "image") {
      return {
        folder: "profile-image",
        allowed_formats: ["jpg", "png"]
      };
    } else if (file.fieldname === "activityImage") {
      return {
        folder: "activity-images",
        allowed_formats: ["jpg", "png"]
      };
    }
  }
});


module.exports = multer({ storage });