// External imports
const Hospital = require("../Models/Hospital");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const { getDataByUser } = require("../utils/filtrationFunctions");
// @desc  get all hospitals
// @route   get /api/v1/hospitals
// @access  public
exports.getHospitals = asyncHandler(async (req, res, next) => {
  // create a return of all hospitals that the user is part of the staff
  if (
    req.user.role === "doctor" ||
    req.user.role === "nurse" ||
    req.user.role === "admin" ||
    req.user.role === "receptionist"
  ) {
    const hospitals = await Hospital.find().populate("departments");
    results = getDataByUser(hospitals, req.user._id);
    return res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } else {
    return res.status(200).json(res.advancedResults);
  }
});

// @desc  get a hospital by id
// @route   get /api/v1/hospitals/:id
// @access  public

exports.getHospital = asyncHandler(async (req, res, next) => {
  const hospital = await Hospital.findById(req.params.id).populate(
    "departments",
    "_id name"
  );

  if (!hospital) {
    return next(
      new ErrorResponse(`Hospital not found with id of ${req.params.id}`, 404)
    );
  }

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
  const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!hospital) {
    return next(
      new ErrorResponse(`Hospital not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: hospital });
});
