const Schedule = require("../Models/Schedule");

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

// Read all schedules of a specific staff member
exports.readAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find({ staff: req.params.staffId });
    res.status(200).json({
      success: true,
      data: schedules,
    });
  } catch (error) {
    res.status(404).json({
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
