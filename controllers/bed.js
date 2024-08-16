
const Bed= require("../Models/Bed");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const {
  getRessources,
  getRessourceById,
  createRessource,
  updateById,
  deleteById,
} = require("../utils/userFunctions");

// @desc  Get all beds
// @route   GET /api/v1/beds
// @access  public
exports.getBeds = asyncHandler(async (req, res, next) => {
  const results = await getRessources(Bed);
  res.status(200).json(results);
});

// @desc  Get single bed
// @route   GET /api/v1/bed/:id
// @access  public
exports.getBed = asyncHandler(async (req, res, next) => {
  const result = await getRessourceById(Bed, req,next);
  res.status(200).json(result);
});

// @desc  Create new Bed
// @route   POST /api/v1/bed
// @access  private
exports.createBed = asyncHandler(async (req, res, next) => {
  const result = await createRessource(Bed, req);
  res.status(201).json(result);
});

// @desc  Update Bed
// @route   PUT /api/v1/bed/:id
// @access  private
exports.updateBed = asyncHandler(async (req, res, next) => {
  const result = await updateById(Bed, req, next);
  res.status(200).json(result);
});

// @desc  Delete Bed
// @route   DELETE /api/v1/beds/:id
// @access  private
exports.deleteBed = asyncHandler(async (req, res, next) => {
  const result = await deleteById(Bed, req, next);
  res.status(204).json(result);
});
