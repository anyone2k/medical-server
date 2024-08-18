const express = require("express");
const Patient = require("../Models/Patient");
const {
  getPatients,
  createPatient,
  getPatient,
  updatePatient,
} = require("../controllers/patient");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { staffProtect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(
    advancedResults(Patient, {
      path: "hospital",
      select: "name email",
    }),
    getPatients
  )
  .post(staffProtect, authorize("admin"), createPatient);
router
  .route("/:id")
  .get(staffProtect, authorize("admin"), getPatient)
  .put(staffProtect, authorize("admin"), updatePatient);
// .delete(staffProtect, deletePatient);
module.exports = router;
