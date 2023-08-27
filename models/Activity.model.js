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
    description: {type: String, default: ''},
    stroller: {type: Boolean, default: false},
    ageMin: {
      type: Number,
      min: 0,
      default: 0,
    },
    ageMax: {
      type: Number,
      min: 0,
      default: 0,
    },
    location: {type: String, default: '',},
    venuetype: {
      default: 'outdoor',
      type: String,
      enum: ["indoor", "outdoor"]
    },
    event: {type: String, default:''},
    date: {type: Date, default: Date.now},
    priced: {type: Boolean, default: false},
    image: {type: String, default: 'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.webp'},
  },
  {
    timestamps: true,
  }
);

const Activity = model("Activity", activitySchema);

module.exports = Activity;