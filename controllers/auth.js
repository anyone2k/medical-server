
// Internal Imports
const Staff = require("../Models/Staff");
const Patient = require("../Models/Patient");
const Doctor = require("../Models/Doctor");
const Bed = require("../Models/Bed");

const asyncHandler = require("../middleware/async");
const {
  loginFunction,
  refreshTokenFunction,
  registerFunction,
  createRessource,
} = require("../utils/userFunctions");

// Staff Functions
// @desc  create login
// @route   post /api/v1/auth/staff/login
// @access  public
exports.postStaffLogin = asyncHandler(async (req, res, next) => {
  results = await loginFunction(Staff, req, next);
  res.status(200).json(results);
});
// @desc  create register
// @route   post /api/v1/auth/staff/register
// @access  public
exports.postStaffRegister = asyncHandler(async (req, res, next) => {
  const result = await registerFunction(Staff, req, next);
  // Send response
  res.status(201).json(result);
});

// @desc  refresh-token
// @route   post /api/v1/auth/staff/refresh-token
// @access  public
exports.staffRefreshAccessToken = asyncHandler(async (req, res, next) => {
  const result = await refreshTokenFunction(Staff, req, next);
  res.status(200).json(result);
});

// Patient Functions
// @desc  create login
// @route   post /api/v1/auth/patient/login
// @access  public
exports.postPatientLogin = asyncHandler(async (req, res, next) => {
  results = await loginFunction(Patient, req);
  res.status(200).json(results);
});
// @desc  create register
// @route   post /api/v1/auth/patient/register
// @access  public
exports.postPatientRegister = asyncHandler(async (req, res, next) => {
  const result = await registerFunction(Patient, req, next);
  // Send response
  res.status(201).json(result);
});

// @desc  refresh-token
// @route   post /api/v1/auth/patient/refresh-token
// @access  public
exports.patientRefreshAccessToken = asyncHandler(async (req, res, next) => {
  const result = await refreshTokenFunction(Patient, req, next);
  res.status(200).json(result);
});

// Doctor Functions

// @desc  create login
// @route   post /api/v1/auth/doctor/login
// @access  public
exports.postDoctorLogin = asyncHandler(async (req, res, next) => {
  results = await loginFunction(Doctor, req, next);
  res.status(200).json(results);
});
// @desc  create register
// @route   post /api/v1/auth/doctor/register
// @access  public
exports.postDoctorRegister = asyncHandler(async (req, res, next) => {
  const result = await registerFunction(Doctor, req, next);
  // Send response
  res.status(201).json(result);
});

// @desc  refresh-token
// @route   post /api/v1/auth/doctor/refresh-token
// @access  public
exports.doctorRefreshAccessToken = asyncHandler(async (req, res, next) => {
  const result = await refreshTokenFunction(Doctor, req, next);
  res.status(200).json(result);
});

exports.postBedRegister = asyncHandler(async (req, res, next) => {
  
  const result = await createRessource(Bed, req, next);

  
  res.status(201).json(result);
});