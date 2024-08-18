// External imports
const express = require("express");

const {
  getBeds,
  getBed,
  createBed,
  updateBed,
  deleteBed,
} = require("../controllers/bed");
const { staffProtect, authorize } = require("../middleware/auth");
const Bed = require("../Models/Bed");
const router = express.Router({ mergeParams: true });
const advancedResults = require("../middleware/advancedResults");
router
  .route("/")
  .get(
    advancedResults(Bed, { path: "hospital", select: "bed_number" }),
    getBeds
  )
  .post(staffProtect, authorize("admin", "receptionist"), createBed);
router
  .route("/:id")
  .get(staffProtect, getBed)
  .put(staffProtect, authorize("admin", "receptionist"), updateBed)
  .delete(staffProtect, authorize("admin", "receptionist"), deleteBed);

module.exports = router;
