const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hotel name is required"],
    },
    type: {
      type: String,
      required: [true, "Hotel type is required"],
    },
    city: {
      type: String,
      required: [true, "City in which the hotel is located is required"],
    },
    address: {
      type: String,
      required: [true, "Hotel address is required"],
    },
    distance: {
      type: String,
      required: [
        true,
        "Distance of the hotel from the city center is required",
      ],
    },
    photos: {
      type: [String],
    },
    title: {
      type: String,
      required: [true, "Hotel title is required"],
    },
    desc: {
      type: String,
      required: [true, "Hotel description is required"],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    rooms: {
      type: [String],
    },
    cheapestPrice: {
      type: Number,
      required: [true, "Cheapest price is required"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
