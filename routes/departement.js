// External imports
const express = require("express");

const {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
} = require("../controllers/departement");
const { protect, authorize, staffProtect } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const Departement = require("../Models/Departement");

router
  .route("/")
  .get(
    advancedResults(Departement, {
      path: "hospital",
      select: "name email role",
    }),
    getDepartments
  )
  .post(protect, createDepartment);
router
  .route("/:id")
  .get(staffProtect, authorize("admin"), getDepartment)
  .put(staffProtect, authorize("admin"), updateDepartment);

module.exports = router;
