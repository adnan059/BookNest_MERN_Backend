const express = require("express");
const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../controllers/userCtrls");
const { verifyToken, verifyUser, verifyAdmin } = require("../utils/verify");

const router = express.Router();

// get all users
router.get("/", verifyToken, verifyAdmin, getAllUsers);

// get one user
router.get("/:id", verifyToken, verifyUser, getOneUser);

// update an user
router.put("/update/:id", verifyToken, verifyUser, updateUser);

// delete an user
router.delete("/delete/:id", verifyToken, verifyUser, deleteUser);

module.exports = router;
