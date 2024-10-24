const express = require("express");
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getAllHotels,
  getOneHotel,
  getHotelsByCityName,
  getHotelsByType,
  getFeaturedHotel,
} = require("../controllers/hotelCtrls");
const { verifyToken, verifyAdmin } = require("../utils/verify");

const router = express.Router();

// get all hotels
router.get("/", getAllHotels);

// get featured hotels
router.get("/featured", getFeaturedHotel);

// get hotels by city name
router.get("/countbycity", getHotelsByCityName);

// get hotels by type
router.get("/countbytype", getHotelsByType);

// get one hotel
router.get("/:id", getOneHotel);

// create a hotel
router.post("/create-hotel", verifyToken, verifyAdmin, createHotel);

// update a hotel
router.put("/update/:id", verifyToken, verifyAdmin, updateHotel);

// delete a hotel
router.delete("/delete/:id", verifyToken, verifyAdmin, deleteHotel);

module.exports = router;
