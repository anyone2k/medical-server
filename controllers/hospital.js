// External imports
const Hospital = require("../Models/Hospital");
const Doctor = require("../Models/Doctor");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const {getRessources, createRessource} = require("../utils/userFunctions")
const { getDataByUser } = require("../utils/filtrationFunctions");
// @desc  get all hospitals
// @route   get /api/v1/hospitals
// @access  public
exports.getHospitals = asyncHandler(async (req, res, next) => {
  

  // create a return of all hospitals that the user is part of the staff
  {
    const hospitals = await getRessources(Hospital);

    return res.status(200).json(
   hospitals
    );
  } 
});
// @desc  Get all doctors by hospital ID
// @route   GET /api/v1/hospitals/:hospitalId/doctors
// @access  public
exports.getDoctorsByHospitalId = asyncHandler(async (req, res, next) => {

  const doctors = await Doctor.find({ hospital: req.params.hospitalId }).populate("hospital", "name");

 
  if (!doctors || doctors.length === 0) {
    return next(
      new ErrorResponse(`No doctors found for hospital with id of ${req.params.hospitalId}`, 404)
    );
  }

  // Réponse avec les docteurs trouvés
  res.status(200).json({
    success: true,
    count: doctors.length,
    data: doctors,
  });
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
