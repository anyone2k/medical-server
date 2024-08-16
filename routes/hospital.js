// create routing for the hospital controller

const express = require("express");
const {
  getHospitals,
  getHospital,
  createHospital,
  updateHospital,
  getDoctorsByHospitalId,
} = require("../controllers/hospital");
const {
  getDepartements,
  getDepartment,
  createDepartment,
  updateDepartment,
} = require("../controllers/departement");

const {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
} = require("../controllers/patient");

const {
  getStaff,
  getStaffById,
  createStaff,
  updateStaff,
} = require("../controllers/staff");

const {
  getPublications,
  getPublicationsByDoctor,
  getPublication,
  createPublication,
  updatePublication,
  deletePublication,
} = require("../controllers/publications");

const Hospital = require("../Models/Hospital");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");

const { authorize, staffProtect } = require("../middleware/auth");

router
  .route("/")
  .get(staffProtect, authorize("admin"), getHospitals)
  .post(staffProtect, authorize("admin"), createHospital);

router
  .route("/:id")
  .get(staffProtect, authorize("admin"), getHospital)
  .put(staffProtect, authorize("admin"), updateHospital);

router
  .route("/:id/doctors")
  .get(staffProtect, authorize("admin"), getDoctorsByHospitalId);

module.exports = router;
