// External imports
const express = require("express");

const {
 getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
 
} = require("../controllers/departement");
const { protect, authorize, staffProtect } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getDepartments).post(protect, createDepartment);
router
  .route("/:id")
  .get(staffProtect,authorize("admin"), getDepartment)
  .put(staffProtect, authorize("admin"), updateDepartment)
  

module.exports = router;
