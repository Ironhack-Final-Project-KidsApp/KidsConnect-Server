const { Schema, model } = require("mongoose");

const activitySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    description: String,
    stroller: Boolean,
    ageMin: {
      type: Number,
      min: 0,
      default: 0,
    },
    ageMax: {
      type: Number,
      min: 0,
    },
    location: String,
    venuetype: {
      type: String,
      enum: ["indoor", "outdoor"]
    },
    event: String,
    date: Date,
    priced: Boolean,
  },
  {
    timestamps: true,
  }
);

const Activity = model("Activity", activitySchema);

module.exports = Activity;