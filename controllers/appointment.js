const Appointment = require("../Models/Appointment");
const asyncHandler = require("../middleware/async");

exports.getAppointments = asyncHandler(async (req, res, next) => {
    
    {
      res.status(200).json(res.advancedResults);
    }
  });


exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a Appointment
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.appointmentId,
      req.body,
      { new: true }
    ); // new: true returns the updated Appointment
    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
