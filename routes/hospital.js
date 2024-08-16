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

const { protect, authorize, staffProtect } = require("../middleware/auth");

router
  .route("/")
  .get( getHospitals)
  .post(staffProtect, authorize("admin"), createHospital);

router
  .route("/:id")
  .get(getHospital)
  .put(protect, authorize("admin"), updateHospital);

  router
  .route("/:id/doctors")
  .get(protect, getDoctorsByHospitalId); 

router
  .route("/:id/departements")
  .get(protect, getDepartements)
  .post(protect, authorize("admin"), createDepartment);

router
  .route("/:id/departements/:departmentId")
  .get(protect, getDepartment)
  .put(protect, authorize("admin"), updateDepartment);

router
  .route("/:id/departements/:departmentId/staff")
  .get(protect, getStaff)
  .post(protect, authorize("admin"), createStaff);
router
  .route("/:id/departements/:departmentId/staff/:staffId")
  .get(protect, getStaffById)
  .put(protect, authorize("admin"), updateStaff);

router
  .route("/:id/departements/:departmentId/staff/:staffId/publications")
  .get(protect, getPublications)
  .post(protect, authorize("admin"), createPublication);

router
  .route("/:id/departements/:departmentId/patients")
  .get(protect, getPatients)
  .post(protect, authorize("admin"), createPatient);

router
  .route("/:id/departements/:departmentId/patients/:patientId")
  .get(protect, getPatientById)
  .put(protect, authorize("admin"), updatePatient);

router
  .route("/:id/departements/:departmentId/patients/:patientId/publications")
  .get(protect, getPublications)
  .post(protect, authorize("admin"), createPublication);

router
  .route(
    "/:id/departements/:departmentId/patients/:patientId/publications/:publicationId"
  )
  .get(protect, getPublication)
  .put(protect, authorize("admin"), updatePublication);

module.exports = router;
