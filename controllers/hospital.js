// External imports
const Hospital = require("../Models/Hospital");

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const { getRessources, createRessource } = require("../utils/userFunctions");
const { getRessourcesWithPopulate } = require("../utils/resourcesFunctions");

// @desc  get all hospitals
// @route   get /api/v1/hospitals
// @access  public
exports.getHospitals = asyncHandler(async (req, res, next) => {
  // create a return of all hospitals that the user is part of the staff
  {
    res.status(200).json(res.advancedResults);
  }
});

// @desc  get a hospital by id
// @route   get /api/v1/hospitals/:id
// @access  public
exports.getHospital = asyncHandler(async (req, res, next) => {
  const hospital = await Hospital.findById(req.params.id);
  // Vérifie si l'hôpital existe
  if (!hospital) {
    return next(
      new ErrorResponse(`Hospital not found with id of ${req.params.id}`, 404)
    );
  }

  // Renvoie les données de l'hôpital
  res.status(200).json({ success: true, data: hospital });
});

// @desc  create a hospital
// @route   post /api/v1/hospitals
// @access  private
exports.createHospital = asyncHandler(async (req, res, next) => {
  const hospital = await Hospital.create(req.body);

  res.status(201).json({ success: true, data: hospital });
});

// @desc  update a hospital
// @route   put /api/v1/hospitals/:id
// @access  private
exports.updateHospital = asyncHandler(async (req, res, next) => {
  let hospital = await Hospital.findById(req.params.id);

  if (!hospital) {
    return next(
      new ErrorResponse(`Hospital not found with id of ${req.params.id}`, 404)
    );
  }

  // Mettre à jour les champs manuellement
  hospital = Object.assign(hospital, req.body);

  try {
    await hospital.save();
    res.status(200).json({
      success: true,
      data: hospital,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 400));
  }
});

// activate a hospital
// @route   put /api/v1/hospitals/:id/activate
// @access  private
exports.activateHospital = asyncHandler(async (req, res, next) => {
  let hospital = await Hospital.findById(req.params.id);

  if (!hospital) {
    return next(
      new ErrorResponse(`Hospital not found with id of ${req.params.id}`, 404)
    );
  }

  hospital.isActive = true;

  try {
    await hospital.save();
    res.status(200).json({
      success: true,
      data: hospital,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 400));
  }
});

// deactivate a hospital
// @route   put /api/v1/hospitals/:id/deactivate
// @access  private

exports.deactivateHospital = asyncHandler(async (req, res, next) => {
  let hospital = await Hospital.findById(req.params.id);

  if (!hospital) {
    return next(
      new ErrorResponse(`Hospital not found with id of ${req.params.id}`, 404)
    );
  }

  hospital.isActive = false;

  try {
    await hospital.save();
    res.status(200).json({
      success: true,
      data: hospital,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 400));
  }
});

exports.getAddresses = asyncHandler(async (req, res, next) => {
  const addresses = await Hospital.find().select("name address");

  res.status(200).json({
    success: true,
    count: addresses.length,
    data: addresses,
  });
});
