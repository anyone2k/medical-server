const Schedule = require("../Models/Schedule");

//
// Get all schedules of a specific doctor
exports.getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find({ doctor: req.params.doctorId });
    res.status(200).json({
      success: true,
      data: schedules,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a schedule
exports.createSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.create(req.body);
    res.status(201).json({
      success: true,
      data: schedule,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a schedule
exports.updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(
      req.params.scheduleId,
      req.body,
      { new: true }
    ); // new: true returns the updated schedule
    res.status(200).json({
      success: true,
      data: schedule,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
