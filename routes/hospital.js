// create routing for the hospital controller

const express = require("express");
const {
  getHospitals,
  getHospital,
  getAddresses,
  createHospital,
  updateHospital,
  deactivateHospital,
  activateHospital,
} = require("../controllers/hospital");

const Hospital = require("../Models/Hospital");

const advancedResults = require("../middleware/advancedResults");

const staffRouter = require("./staff");
const departmentRouter = require("./departement");
const doctorRouter = require("./doctor");
const patientRouter = require("./patient");
const bedRouter = require("./bed");
const searchRouter = require("./search");

const { authorize, staffProtect } = require("../middleware/auth");
const router = express.Router();

router.use("/:hospitalId/staff", staffRouter);
router.use("/:hospitalId/departments", departmentRouter);
router.use("/:hospitalId/doctors", doctorRouter);
router.use("/:hospitalId/patients", patientRouter);
router.use("/:hospitalId/beds", bedRouter);
router.use("/:hospitalId/search", searchRouter);
router
  .route("/")
  .get(advancedResults(Hospital), getHospitals)
  .post(staffProtect, authorize("admin"), createHospital);

router
  .route("/:id")
  .get(staffProtect, authorize("admin"), getHospital)
  .put(staffProtect, authorize("admin"), updateHospital);
router
  .route("/:id/deactivate")
  .put(staffProtect, authorize("admin"), deactivateHospital);
router
  .route("/:id/activate")
  .put(staffProtect, authorize("admin"), activateHospital);

router.route("/addresses/get").get(getAddresses);

module.exports = router;
