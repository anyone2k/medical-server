// External imports
const express = require("express");
// Internal imports
const {
  postLogin,
  postRegister,
  refreshAccessToken,
} = require("../controllers/auth");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// login & register for doctors

router.route("/doctor/login");
router.route("/doctor/register");
router.route("/doctor/refresh-token");

// login & register for patient
router.route("/patient/login").post(postLogin);
router.route("/patient/register").post(postRegister);
router.route("/patient/refresh-token").get(refreshAccessToken);

// make routes for staff
router.route("/staff/login").post(postLogin);
router.route("/staff/register").post(protect, authorize("admin"), postRegister);
router.route("/staff/refresh-token").get(refreshAccessToken);


module.exports = router;
