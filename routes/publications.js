//// External imports
const express = require("express");

// Internal imports
const { protect, isDoctor } = require("../middleware/auth");
// create the internal imports
const {
  getPublications,
  getPublication,
  createPublication,
  updatePublication,
  deletePublication,
} = require("../controllers/publications");
const advancedResults = require("../middleware/advancedResults");
const Publication = require("../Models/Publication");

const router = express.Router();

router
  .route("")
  .get(
    protect,
    advancedResults(Publication, "patient modifiedBy.doctor"),
    getPublications
  );

router
  .route("/:id")
  .post(protect, isDoctor, createPublication)
  .put(protect, isDoctor, updatePublication)
  .delete(protect, isDoctor, deletePublication);

module.exports = router;
