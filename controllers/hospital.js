// External imports
const Hospital = require("../Models/Hospital");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc  get all hospitals
// @route   get /api/v1/hospitals
// @access  public
exports.getHospitals = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc  get a hospital by id
// @route   get /api/v1/hospitals/:id
// @access  public

exports.getHospital = asyncHandler(async (req, res, next) => {
  const hospital = await Hospital.findById(req.params.id);

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

// @desc  delete a hospital
// @route   delete /api/v1/hospitals/:id
// @access  private
exports.deleteHospital = asyncHandler(async (req, res, next) => {
  const hospital = await Hospital.findByIdAndDelete(req.params.id);

  if (!hospital) {
    return next(
      new ErrorResponse(`Hospital not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
