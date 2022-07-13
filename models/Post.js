const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    animalType: {
      type: String,
      required: [true, "Please provide Animal Type"],
      enum: {
        values: ["cat", "dog"],
        message: "{VALUE} is not supported",
      },
    },
    city: {
      type: String,
      required: [true, "Please Provide City"],
      maxlength: 50,
    },
    district: {
      type: String,
      required: [true, "Please Provide District"],
      maxlength: 50,
    },
    price: {
      type: Number,
      required: [true, "Please Provide Price"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
