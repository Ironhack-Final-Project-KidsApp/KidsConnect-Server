const { Schema, model } = require("mongoose");

const userSchema = new Schema(
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
      required: [true, "add some description."],
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
        type: Boolean,
    },
    rating:{
        type: Number,
    },
    event:{
        type: Boolean,
    },
    priced:{
        type: Boolean,
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Activity = model("Activity", userSchema);

module.exports = Activity;
