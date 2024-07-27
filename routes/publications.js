// create the crude routes for the publication
// using the auth.js as a reference in the routes folder
//
// create a publication schema for mongoose
// use the following code as a reference
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

// create the router
const router = express.Router();

// create the routes for the publications

router
  .route("")
  .get(protect, advancedResults(Publication, "user"), getPublications);

router
  .route("/:id")
  .post(protect, isDoctor, createPublication)
  .get(getPublication)
  .put(updatePublication)
  .delete(deletePublication);

module.exports = router;
