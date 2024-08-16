// External imports
const express = require("express");

const {
    getBeds,
    getBed,
    createBed,
    updateBed,
    deleteBed,
} = require("../controllers/bed");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getBeds).post(protect, createBed);
router
  .route("/:id")
  .get(protect, getBed)
  .put(protect, authorize("admin"), updateBed)
  .delete(protect, authorize("admin"), deleteBed);

module.exports = router;
