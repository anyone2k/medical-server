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

// create the router
const router = express.Router();

// create the routes for the publications

router
  .route("")
  .get(protect, getPublications)
  .post(protect, isDoctor, createPublication);

router
  .route("/:id")
  .get(protect, getPublication)
  .put(protect, isDoctor, updatePublication)
  .delete(protect, isDoctor, deletePublication);

module.exports = router;
