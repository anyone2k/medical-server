// make a get request to /api/v1/appointments
const { Appointment } = require("../Models/Appointment");
const asyncHandler = require("../middleware/async");
// @desc Get all appointments
// @route GET /api/v1/appointments
// @route GET /api/v1/patients/:patientId/appointments

exports.getAppointments = asyncHandler(async (req, res) => {
  // check for patient id in the query
  if (req.params.patientId) {
    const appointments = await Appointment.find({
      patient: req.params.patientId,
    }).populate({ path: "doctor", select: "fullName specialisation" });
    return res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  }
  res.status(200).json(res.advancedResults);
});
