const express = require("express");
const Appointment = require("../Models/Appointment");
const {
  getAppointments,
  createAppointment ,
  updateAppointment,
} = require("../controllers/appointment");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");


router
  .route("/")
  .get(advancedResults(Appointment), getAppointments)
  .post(createAppointment);
router
  .route("/:id")
 
  .put(updateAppointment);


module.exports = router;
