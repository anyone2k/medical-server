// External imports
const Department = require("../Models/Departement");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc  get all departments
// @route   get /api/v1/departments
// @access  public
// get departments using hospital id
exports.getDepartements = asyncHandler(async (req, res, next) => {
  if (req.params.id) {
    const departments = await Department.find({ hospital: req.params.id });

    return res.status(200).json({
      success: true,
      count: departments.length,
      data: departments,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc  get a department by id
// @route   get /api/v1/departments/:id
// @access  public
exports.getDepartment = asyncHandler(async (req, res, next) => {
  const department = await Department.findById(req.params.departmentId);

  if (!department) {
    return next(
      new ErrorResponse(`Department not found with id of ${req.params.id}`, 404)
    );
  }

  res
    .status(200)
    .json(
      await Department.findById(req.params.departmentId)
        .populate("headOfDepartement", "name email")
        .populate("patients", "name email age")
        .populate("staff", "name email role")
    );
});

// @desc  create a department
// @route   post /api/v1/departments
// @access  private
exports.createDepartment = asyncHandler(async (req, res, next) => {
  const department = await Department.create(req.body);

  res.status(201).json({ success: true, data: department });
});

// @desc  update a department
// @route   put /api/v1/departments/:id
// @access  private
exports.updateDepartment = asyncHandler(async (req, res, next) => {
  const department = await Department.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!department) {
    return next(
      new ErrorResponse(`Department not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: department });
});
