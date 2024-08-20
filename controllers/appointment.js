// make a get request to /api/v1/appointments
const Appointment = require("../Models/Appointment");
const asyncHandler = require("../middleware/async");
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
