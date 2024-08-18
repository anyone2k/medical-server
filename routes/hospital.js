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
const { authorize, staffProtect } = require("../middleware/auth");
const router = express.Router();

router.use("/:hospitalId/staff", staffRouter);

router
  .route("/")
  // add this staffProtect, authorize("admin"),
  .get(advancedResults(Hospital, "staff"), getHospitals)
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
