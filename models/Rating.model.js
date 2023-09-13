const { Schema, model } = require("mongoose");

const ratingSchema = new Schema(
  {
    activity: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Activity"
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    rate: {
      type: Number,
      max: 5,
      min: 0
    },
  },
  {
    timestamps: true,
  }
);

const Rating = model("Rating", ratingSchema);

module.exports = Rating;
