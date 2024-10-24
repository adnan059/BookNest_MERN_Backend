const express = require("express");
const {
  getAllRooms,
  getOneRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  getHotelRooms,
  updateRoomAvailability,
} = require("../controllers/roomCtrls");
const { verifyToken, verifyAdmin } = require("../utils/verify");

const router = express.Router();

// get all rooms
router.get("/", getAllRooms);

// get rooms of a specific hotel
router.get("/roomsbyhotel/:hotelId", getHotelRooms);

// get one specific room
router.get("/:id", getOneRoom);

// create a room
router.post("/create-room/:hotelId", verifyToken, verifyAdmin, createRoom);

// update a room
router.put("/update/:id", verifyToken, verifyAdmin, updateRoom);

// update room availability
router.put(
  "/update-availability/:roomNumberId",
  verifyToken,
  updateRoomAvailability
);

// delete a room
router.delete("/delete/:id/:hotelId", verifyToken, verifyAdmin, deleteRoom);

module.exports = router;
