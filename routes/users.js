// External imports
const express = require("express");

// Internal imports
const { protect, isDoctor } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const User = require("../Models/User");
const { getUsers } = require("../controllers/users");

// Internal Imports

// Constants
const router = express.Router();

// Routes /users
router.route("/").get(
  protect,
  isDoctor,
  advancedResults(User, "", {
    isDoctor: false,
  }),
  getUsers
);

// Export
module.exports = router;
