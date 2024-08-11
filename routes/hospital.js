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

const { getStaff } = require("../controllers/staff");

const Hospital = require("../Models/Hospital");

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
  .get(getDepartements)
  .post(authorize("admin"), createDepartment);

router
  .route("/:id/departements/:departmentId")
  .get(getDepartment)
  .put(protect, authorize("admin"), updateDepartment)
  .delete(protect, authorize("admin"), deleteDepartment);

router.route("/:id/departements/:departementId/staff").get(getStaff);
router.route("/:id/departements/:departementId/staff/:staffId").post(getStaff);
router.route("/:id/departements/:departementId/staff/:staffId").put(getStaff);
router
  .route("/:id/departements/:departementId/staff/:staffId")
  .delete(getStaff);

module.exports = router;
