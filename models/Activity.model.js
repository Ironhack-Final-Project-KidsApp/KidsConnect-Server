const { Schema, model } = require("mongoose");

const activitySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required."],
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    description: {
      type: String,
    //   required: [true, "add some description."],
    },
    stroller: {
      type: Boolean,
    //   required: [true, "is it stroller accesible?"],
    },
    ageMin: {
        type: Number,
        min: 0,
        default: 0,
    },
    ageMax:{
        type: Number,
        min: 0,
    },
    location:{
        type: String,
    },
    venuetype:{
        type: String,
    },
    rating:{ // move as a new model itself
        type: Number,
    },
    event:{ //Add Like meet up, get together, small feast
        type: String,
    },
    date: Date, //whether it's also a one time thing or not.
    priced:{
        type: Boolean,
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Activity = model("Activity", activitySchema);

module.exports = Activity;
