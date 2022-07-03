const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide Name"],
    },
    owner: {
      type: String,
      required: [true, "Please provide Owner"],
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
      required: [true, "Please Provide Neighbourhood"],
      maxlength: 50,
    },
    phone: {
      type: Number,
      required: [true, "Please Provide Phone"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Store", StoreSchema);
