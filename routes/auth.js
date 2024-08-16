// External imports
const express = require("express");
// Internal imports
const {
  postPatientLogin,
  postStaffLogin,
  postDoctorLogin,
  postStaffRegister,
  postPatientRegister,
  postDoctorRegister,
  patientRefreshAccessToken,
  staffRefreshAccessToken,
  doctorRefreshAccessToken,
} = require("../controllers/auth");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// login & register for doctors

router.route("/doctor/login").post(postDoctorLogin);
router .route("/doctor/register").post(protect("staff"), authorize("admin"), postDoctorRegister);
  
router.route("/doctor/refresh-token").post(doctorRefreshAccessToken);

// login & register for patient
router.route("/patient/login").post(postPatientLogin);
router.route("/patient/register").post(protect("staff"), authorize("admin"),postPatientRegister);
router.route("/patient/refresh-token").get(patientRefreshAccessToken);

// make routes for staff
router.route("/staff/login").post(postStaffLogin);
router
  .route("/staff/register")
  .post(protect("staff"), authorize("admin"), postStaffRegister);
router.route("/staff/refresh-token").get(staffRefreshAccessToken);

module.exports = router;
