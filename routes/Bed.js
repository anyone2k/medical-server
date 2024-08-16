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

const router = express.Router();

router
  .route("/")
  .get(getBeds)
  .post(staffProtect, authorize(["admin", "receptionist"]), createBed);
router
  .route("/:id")
  .get(staffProtect, getBed)
  .put(staffProtect, authorize(["admin", "receptionist"]), updateBed)
  .delete(staffProtect, authorize(["admin", "receptionist"]), deleteBed);

module.exports = router;
