// External imports
const express = require("express");

const {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctor");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getDoctors).post(protect, createDoctor);
router
  .route("/:id")
  .get(protect, getDoctor)
  .put(protect, authorize("admin"), updateDoctor)
  .delete(protect, authorize("admin"), deleteDoctor);

module.exports = router;
