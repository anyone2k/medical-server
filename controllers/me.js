// Internal Imports
const Patient = require("../models/Patient");
const Staff = require("../Models/Staff");
const asyncHandler = require("../middleware/async");

// @desc  read me
// @route   GET /me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

// @desc  update me
// @route   PUT /me
// @access  Private
exports.putMe = asyncHandler(async (req, res, next) => {
  const filter = {};
  if (req.body.email) filter.email = req.body.email;
  if (req.body.fullName) {
    if (req.body.firstName) filter.firstName = req.body.firstName;
    else filter.fullName.firstName = req.user.firstName;
    if (req.body.lastName) filter.lastName = req.body.lastName;
    else filter.lastName = req.user.lastName;
  }
  if (req.body.dateOfBirth) filter.dateOfBirth = req.body.dateOfBirth;
  if (req.body.profilePicture) filter.profilePicture = req.body.profilePicture;

  const updatedPatient = await Patient.findByIdAndUpdate(req.user._id, filter, {
    new: true,
  });

  res.status(200).json({
    success: true,
    data: updatedPatient,
  });
});

// @desc  Delete me
// @route   DELETE /me
// @access  Private
exports.deleteMe = async (req, res, next) => {
  await Users.findByIdAndDelete(req.user._id);
  res.status(200).send({
    success: true,
    data: {},
  });
};
