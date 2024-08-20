const express = require("express");
// Internal imports
const Appointment = require("../Models/Appointment");
const {
  createAppointment,
  getAppointments,
  UpdateAppointment,
  DeleteAppointment,
} = require("../controllers/appointment");

const router = express.Router({ mergeParams: true });
const advancedResults = require("../middleware/advancedResults");
const { staffProtect, authorize } = require("../middleware/auth");

router
  .route("/")
  .post(createAppointment)
  .get(
    advancedResults(Appointment, { path: "patient", select: "name email" }),
    getAppointments
  );

router.route("/:id").put(UpdateAppointment).delete(DeleteAppointment);

module.exports = router;
