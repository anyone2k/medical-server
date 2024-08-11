// External imports
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Department = require("../Models/Departement");
// @desc  get all patients by hospital
// @route   get /api/v1/patients
// @access  public
exports.getPatients = asyncHandler(async (req, res, next) => {
  // get all patients from the hospital use the following route "/:id/departements/:departementId/staff"
  const department = await Department.findById(req.params.departmentId);
  if (!department) {
    return next(
      new ErrorResponse(`Department not found with id of ${req.params.id}`, 404)
    );
  }
  const patients = await Department.findById(req.params.departmentId).populate(
    "patients",
    "name email"
  );
  res.status(200).json(patients["patients"]);
});

// @desc  get single patient
// @route   get /api/v1/patients/:id
// @access  public
exports.getPatientById = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id);
  if (patient === null) {
    return next(
      new ErrorResponse(`Patient not found with id of ${req.params.id}`, 404)
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

// @desc  delete patient
// @route   delete /api/v1/patients/:id
// @access  private
exports.deletePatient = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findByIdAndDelete(req.params.id);
  if (!patient) {
    return next(
      new ErrorResponse(`Patient not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).send(patient);
});
