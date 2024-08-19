// External imports
const express = require("express");
const Doctor = require("../Models/Doctor");
const {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctor");
const scheduleRouter = require("./schedule");
const router = express.Router({ mergeParams: true });
const advancedResults = require("../middleware/advancedResults");

const { staffProtect, authorize } = require("../middleware/auth");

router.use("/:doctorId/schedule", scheduleRouter);
router.use("/search", require("./search"));
router
  .route("/")
  .get(
    advancedResults(Doctor, {
      path: "hospital",
      select: "name address",
    }),
    getDoctors
  )
  .post(staffProtect, createDoctor);
router
  .route("/:id")
  .get(staffProtect, authorize("admin"), getDoctor)
  .put(staffProtect, authorize("admin"), updateDoctor)
  .delete(staffProtect, authorize("admin"), deleteDoctor);

module.exports = router;
