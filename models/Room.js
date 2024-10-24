const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title of the room is required"],
    },
    price: {
      type: Number,
      required: [true, "Price of the room is required"],
    },
    maxPeople: {
      type: Number,
      required: [
        true,
        "Maximum number of people the room can accommodate is required",
      ],
    },
    desc: {
      type: String,
      required: [true, "Room description is required"],
    },
    roomNumbers: [
      {
        number: { type: Number },
        unavailableDates: { type: [Date] },
      },
    ],
  },
  {
    timestamps: true,
  }
);

roomSchema.plugin(uniqueValidator, {
  message:
    "Another room with the same {PATH} already exists. Please try with another one.",
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
