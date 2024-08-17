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

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");

const { authorize, staffProtect } = require("../middleware/auth");

router
  .route("/")
  // add this staffProtect, authorize("admin"),
  .get(getHospitals)
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
