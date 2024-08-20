// External imports
const Departement = require("../Models/Departement");
const Staff = require("../Models/Staff");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const { registerFunction } = require("../utils/userFunctions");
// @desc  get all staff by hospital
// @route   get /api/v1/staff
// @access  public
exports.getStaff = asyncHandler(async (req, res, next) => {
  if (req.params.hospitalId) {
    const staff = await Staff.find({ hospital: req.params.hospitalId }).select(
      "name email role"
    );
    return res.status(200).send({
      success: true,
      count: staff.length,
      data: staff,
    });
  } else {
    res.status(200).send(res.advancedResults);
  }
});

// @desc  get single staff
// @route   get /api/v1/staff/:id
// @access  public
exports.getStaffById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const staff = await Staff.findById(id);

  if (!staff) {
    return next(
      new ErrorResponse(`Staff not found with id of ${staffId}`, 404)
    );
  }

  res.status(200).send(staff);
});

// @desc  create staff
// @route   post /api/v1/staff
// @access  private
exports.createStaff = asyncHandler(async (req, res, next) => {
  const result = await registerFunction(Staff, req, next);
  res.status(201).send("success");
});

// @desc  update staff
// @route   put /api/v1/staff/:id
// @access  private
exports.updateStaff = asyncHandler(async (req, res, next) => {
  const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!staff) {
    return next(
      new ErrorResponse(`Staff not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).send(staff);
});
