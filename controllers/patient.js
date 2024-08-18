// External imports
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Department = require("../Models/Departement");

const Patient = require("../Models/Patient");
// @desc  get all patients by hospital
// @route   get /api/v1/patients
// @access  public
exports.getPatients = asyncHandler(async (req, res, next) => {
  if (req.params.hospitalId) {
    const patients = await Patient.find({
      hospital: req.params.hospitalId,
    }).select("name email age");
    return res.status(200).json({
      success: true,
      count: patients.length,
      data: patients,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc  get single patient
// @route   get /api/v1/patients/:id
// @access  public
exports.getPatientById = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findById(
    req.params.patientId,
    "_id name email profilePicture"
  );
  if (patient === null) {
    return next(
      new ErrorResponse(
        `Patient not found with id of ${req.params.patientId}`,
        404
      )
    );
  }
  res.status(200).send(patient);
});

// @desc  create patient
// @route   post /api/v1/patients
// @access  private
exports.createPatient = asyncHandler(async (req, res, next) => {
  const patient = await Patient.create(req.body);
  res.status(201).send(patient);
});

// @desc  update patient
// @route   put /api/v1/patients/:id
// @access  private
exports.updatePatient = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!patient) {
    return next(
      new ErrorResponse(`Patient not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).send(patient);
});
