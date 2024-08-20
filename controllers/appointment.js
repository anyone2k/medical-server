// make a get request to /api/v1/appointments
const Appointment = require("../Models/Appointment");
const Doctor = require("../Models/Doctor");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const {
  createRessource,
  updateById,
  deleteById,
} = require("../utils/userFunctions");
// @desc Get all appointments
// @route GET /api/v1/appointments
// @route GET /api/v1/patients/:patientId/appointments

exports.getAppointments = asyncHandler(async (req, res, next) => {
  if (req.params.patientId) {
    const appointments = await Appointment.find({
      patient: req.params.patientId,
    });
    return res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

exports.createAppointment = asyncHandler(async (req, res, next) => {
  const { patientId, doctorId } = req.body;

  // Get the doctor's availability
  const doctor = await Doctor.findOne({ _id: doctorId }).populate(
    "availability"
  );

  if (!doctor) {
    return next(new ErrorResponse("Doctor not found", 404));
  }

  // Check if the doctor is available on the requested day
  const dayOfWeek = new Date(req.body.dayTime).getDay();
  const dayMapping = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  // Check if the doctor is available on the requested day
  const availableOnDay = doctor.availability[dayMapping[dayOfWeek]];

  if (!availableOnDay) {
    return next(new ErrorResponse(`Doctor is not available on this day`, 400));
  }

  // Create the appointment
  const appointment = await Appointment.create(req.body);

  res.status(201).json({
    success: true,
    data: appointment,
  });
});

exports.UpdateAppointment = asyncHandler(async (req, res, next) => {
  const result = await updateById(Appointment, req, next);
  res.status(200).json(result);
});

exports.DeleteAppointment = asyncHandler(async (req, res, next) => {
  const result = await deleteById(Appointment, req, next);
  res.status(204).json(result);
});
