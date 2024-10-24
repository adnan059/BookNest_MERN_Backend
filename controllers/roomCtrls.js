const Room = require("../models/Room.js");
const Hotel = require("../models/Hotel.js");

// create a room
const createRoom = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;

    const newRoom = await Room.create(req.body);

    await Hotel.findByIdAndUpdate(
      hotelId,
      { $push: { rooms: newRoom._id } },
      { new: true }
    );

    res.status(201).json(newRoom);
  } catch (error) {
    next(error);
  }
};

// update a room
const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

// update room availability
const updateRoomAvailability = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findOneAndUpdate(
      {
        "roomNumbers._id": req.params.roomNumberId,
      },
      {
        $push: { "roomNumbers.$.unavailableDates": req.body.allDates },
      },
      { new: true }
    );

    res.status(200).json({ message: "Room has been booked successfully" });
  } catch (error) {
    next(error);
  }
};

// delete a Room
const deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    await Hotel.findByIdAndUpdate(
      req.params.hotelId,
      { $pull: { rooms: req.params.id } },
      { new: true }
    );
    res.status(200).json({ message: "Room deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

// get all rooms
const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

// Get a specific room;
const getOneRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

// get rooms of a specific hotel
const getHotelRooms = async (req, res, next) => {
  try {
    const { hotelId } = req.params;
    const hotel = await Hotel.findById(hotelId);
    const rooms = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getAllRooms,
  getOneRoom,
  getHotelRooms,
  updateRoomAvailability,
};
