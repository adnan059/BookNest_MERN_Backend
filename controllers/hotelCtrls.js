const Hotel = require("../models/Hotel.js");

// get all hotels
const getAllHotels = async (req, res, next) => {
  const { limit, min, max, city } = req.query;

  try {
    let hotels;
    if (limit || min || max || city) {
      hotels = await Hotel.find({
        cheapestPrice: { $gte: min || 10, $lte: max || 1500 },
        city,
      }).limit(limit);

      return res.status(200).json(hotels);
    } else {
      hotels = await Hotel.find();

      return res.status(200).json(hotels);
    }
  } catch (error) {
    next(error);
  }
};

// get only featured hotels
const getFeaturedHotel = async (req, res, next) => {
  try {
    const hotels = await Hotel.find({ featured: true }).limit(4);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

// Get a Specific Hotel;
const getOneHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

// get hotels by city name
const getHotelsByCityName = async (req, res, next) => {
  try {
    const cities = req.query.cities.split(",");

    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

// get hotels by type
const getHotelsByType = async (req, res, next) => {
  try {
    const boutiqueCount = await Hotel.countDocuments({ type: "Boutique" });
    const resortCount = await Hotel.countDocuments({ type: "Resort" });
    const lodgeCount = await Hotel.countDocuments({ type: "Lodge" });
    const luxuryCount = await Hotel.countDocuments({ type: "Luxury" });
    const apartmentCount = await Hotel.countDocuments({ type: "Apartment" });

    const list = [
      { type: "boutiques", count: boutiqueCount },
      { type: "resorts", count: resortCount },
      { type: "lodges", count: lodgeCount },
      { type: "luxuries", count: luxuryCount },
      { type: "apartments", count: apartmentCount },
    ];

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

// create hotel
const createHotel = async (req, res, next) => {
  try {
    const newHotel = await Hotel.create(req.body);
    res.status(201).json(newHotel);
  } catch (error) {
    next(error);
  }
};

// update a hotel
const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

// delete a hotel
const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Hotel deleted successfully!" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getAllHotels,
  getOneHotel,
  getHotelsByCityName,
  getHotelsByType,
  getFeaturedHotel,
};
