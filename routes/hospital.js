// create routing for the hospital controller

const express = require("express");
const {
  getHospitals,
  getHospital,
  createHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospital");
const {
  getDepartements,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departement");

const {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patient");

const {
  getStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
} = require("../controllers/staff");

const Hospital = require("../Models/Hospital");

const Departement = require("../Models/Departement");

const Patient = require("../models/Patient");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(advancedResults(Hospital, "departments"), getHospitals)
  .post(protect, authorize("admin"), createHospital);

router
  .route("/:id")
  .get(getHospital)
  .put(protect, authorize("admin"), updateHospital)
  .delete(protect, authorize("admin"), deleteHospital);

router
  .route("/:id/departements")
  .get(protect, getDepartements)
  .post(protect, authorize("admin"), createDepartment);

router
  .route("/:id/departements/:departmentId")
  .get(protect, getDepartment)
  .put(protect, authorize("admin"), updateDepartment)
  .delete(protect, authorize("admin"), deleteDepartment);

router
  .route("/:id/departements/:departmentId/staff")
  .get(protect, getStaff)
  .post(protect, authorize("admin"), createStaff);
router
  .route("/:id/departements/:departmentId/staff/:staffId")
  .get(protect, getStaffById)
  .put(protect, authorize("admin"), updateStaff)
  .delete(protect, authorize("admin"), deleteStaff);

router
  .route("/:id/departements/:departmentId/patients")
  .get(protect, getPatients)
  .post(protect, authorize("admin"), createPatient);

router
  .route("/:id/departements/:departmentId/patients/:patientId")
  .get(protect, getPatientById)
  .put(protect, authorize("admin"), updatePatient)
  .delete(protect, authorize("admin"), deletePatient);

module.exports = router;
