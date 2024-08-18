// create routing for the hospital controller

const express = require("express");
const {
  getHospitals,
  getHospital,
  getAddresses,
  createHospital,
  updateHospital,
  getDoctorsByHospitalId,
  getDepartmentsByHospitalId,
} = require("../controllers/hospital");

const Hospital = require("../Models/Hospital");

const advancedResults = require("../middleware/advancedResults");

const staffRouter = require("./staff");
const departmentRouter = require("./departement");
const doctorRouter = require("./doctor");
const patientRouter = require("./patient");
const bedRouter = require("./bed");

const { authorize, staffProtect } = require("../middleware/auth");
const router = express.Router();

router.use("/:hospitalId/staff", staffRouter);
router.use("/:hospitalId/departments", departmentRouter);
router.use("/:hospitalId/doctors", doctorRouter);
router.use("/:hospitalId/patients", patientRouter);
router.use("/:hospitalId/beds", bedRouter);
router
  .route("/")
  // add this staffProtect, authorize("admin"),
  .get(advancedResults(Hospital), getHospitals)
  .post(staffProtect, authorize("admin"), createHospital);

router.route("/addresses").get(getAddresses);
router
  .route("/:id")
  .get(staffProtect, authorize("admin"), getHospital)
  .put(staffProtect, authorize("admin"), updateHospital);

router
  .route("/:id/doctors")
  .get(staffProtect, authorize("admin"), getDoctorsByHospitalId);

router
  .route("/:id/department")
  .get(staffProtect, authorize("admin"), getDepartmentsByHospitalId);

module.exports = router;
