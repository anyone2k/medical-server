// External imports
const express = require("express");

const {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctor");
const { protect, authorize, staffProtect } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getDoctors).post(protect, createDoctor);
router
  .route("/:id")
  .get(staffProtect,authorize("admin"), getDoctor)
  .put(staffProtect, authorize("admin"), updateDoctor)
  .delete(staffProtect, authorize("admin"), deleteDoctor);

module.exports = router;
