const mongoose = require("mongoose");

const CustomerPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide Title"],
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
      maxlength: 100,
    },
    maxPrice: {
      type: Number,
      required: [true, "Please Provide Max Price"],
      maxlength: 12,
    },
    minPrice: {
      type: Number,
      required: [true, "Please Provide Min Price"],
      maxlength: 12,
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
    neighbourhood: {
      type: String,
      // required: [true, "Please Provide Neighbourhood"],
      maxlength: 50,
    },
    roomNumber: {
      type: String,
      required: [true, "Please Provide roomNumber"],
      maxlength: 7,
    },

    store: {
      type: String,
      ref: "Store",
      required: [true, "Please Provide Store"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomerPost", CustomerPostSchema);
