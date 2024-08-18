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
// @desc  Get all doctors by hospital ID
// @route   GET /api/v1/hospitals/:hospitalId/doctors
// @access  public
exports.getDoctorsByHospitalId = asyncHandler(async (req, res, next) => {
  // Trouver l'hôpital par son ID et peupler les docteurs associés
  const hospital = await Hospital.findById(req.params.id)
    .populate("staff", "fullName email role")
    .populate("doctors", "fullName email specialization")
    .populate("patients", "fullName email");

  // Vérifier si l'hôpital existe
  if (!hospital) {
    return next(
      new ErrorResponse(`Hospital not found with id of ${req.params.id}`, 404)
    );
  }

  // Vérifier si des docteurs sont associés à cet hôpital
  const doctors = hospital.doctors;

  if (!doctors || doctors.length === 0) {
    return next(
      new ErrorResponse(
        `No doctors found for hospital with id of ${req.params.id}`,
        404
      )
    );
  }

  // Réponse avec les docteurs trouvés
  res.status(200).json({
    success: true,
    count: doctors.length,
    data: doctors,
  });
});

// @desc  Get all departments by hospital ID
// @route   GET /api/v1/hospitals/:hospitalId/department
// @access  public
exports.getDepartmentsByHospitalId = asyncHandler(async (req, res, next) => {
  // Trouver l'hôpital par son ID et peupler les docteurs associés
  const hospital = await Hospital.findById(req.params.id).populate(
    "departements"
  );

  // Vérifier si l'hôpital existe
  if (!hospital) {
    return next(
      new ErrorResponse(`Hospital not found with id of ${req.params.id}`, 404)
    );
  }

  // Vérifier si des departements sont associés à cet hôpital
  const departements = hospital.departement;

  if (!departements || departements.length === 0) {
    return next(
      new ErrorResponse(
        `No departments found for hospital with id of ${req.params.id}`,
        404
      )
    );
  }

  // Réponse avec les departements trouvés
  res.status(200).json({
    success: true,
    count: departements.length,
    data: departements,
  });
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

exports.getAddresses = asyncHandler(async (req, res, next) => {
  const addresses = await Hospital.find().select("name address");

  res.status(200).json({
    success: true,
    count: addresses.length,
    data: addresses,
  });
});
