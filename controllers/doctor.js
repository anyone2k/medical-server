// Internal Imports
const Doctor = require("../Models/Doctor");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const {
  getRessources,
  getRessourceById,
  createRessource,
  updateById,
  deleteById,
} = require("../utils/userFunctions");

// @desc  Get all doctors
// @route   GET /api/v1/doctors
// @access  public
exports.getDoctors = asyncHandler(async (req, res, next) => {
  const results = await getRessources(Doctor);
  res.status(200).json(results);
});

// @desc  Get single doctor
// @route   GET /api/v1/doctors/:id
// @access  public
exports.getDoctor = asyncHandler(async (req, res, next) => {
  try {
    const result = await getRessourceById(Doctor, req);
    res.status(200).json(result);
  } catch (error) {
    next(error); // Cela envoie l'erreur à votre middleware de gestion d'erreurs
  }
});


// @desc  Create new doctor
// @route   POST /api/v1/doctors
// @access  private
exports.createDoctor = asyncHandler(async (req, res, next) => {
  const result = await createRessource(Doctor, req);
  res.status(201).json(result);
});

// @desc  Update doctor
// @route   PUT /api/v1/doctors/:id
// @access  private
exports.updateDoctor = asyncHandler(async (req, res, next) => {
  const result = await updateById(Doctor, req);
  res.status(200).json(result);
});

// @desc  Delete doctor
// @route   DELETE /api/v1/doctors/:id
// @access  private
exports.deleteDoctor = asyncHandler(async (req, res, next) => {
  const result = await deleteById(Doctor, req);
  res.status(204).json(result);
});


