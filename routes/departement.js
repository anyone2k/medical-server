// External imports
const express = require("express");

const {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
} = require("../controllers/departement");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const Departement = require("../Models/Departement");
const { protect, authorize, staffProtect } = require("../middleware/auth");
router
  .route("/")
  .get(
    advancedResults(Departement, {
      path: "hospital",
      select: "name headOfDepartement",
    }),
    getDepartments
  )
  .post(protect, createDepartment);
router
  .route("/:id")
  .get(staffProtect, authorize("admin"), getDepartment)
  .put(staffProtect, authorize("admin"), updateDepartment);

module.exports = router;
