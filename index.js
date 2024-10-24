require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// -------------------------------------

const authRoutes = require("./routes/authRoutes.js");
const hotelRoutes = require("./routes/hotelRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const roomRoutes = require("./routes/roomRoutes.js");

// -------------------------------------

const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL;

// --------------------------------------

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Database Connected Successfully");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

connectDB();

// --------------------------------------

const app = express();
app.use(express.json());
app.use(cors());

// ---------------------------------------

app.post("/test", (req, res) => {
  res.send("working");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);

// ----------------------------------------

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something Went Wrong!";
  const stack = err.stack;
  return res.status(status).json({
    status,
    message,
    stack,
    success: false,
  });
});
