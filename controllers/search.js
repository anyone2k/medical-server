const asyncHandler = require("../middleware/async");
const Doctor = require("../Models/Doctor");

exports.getSearch = asyncHandler(async (req, res) => {
  let query = req.query.search;

  if (!query) {
    return res.status(400).json({
      success: false,
      message: "Please provide a search term.",
    });
  }

  try {
    // Create a case-insensitive regex from the query
    const regex = new RegExp(query, "i"); // 'i' flag makes the regex case-insensitive

    // Search for doctors by first name, last name, or specialisation
    const doctors = await Doctor.find({
      $or: [
        { "fullName.firstName": regex }, // First name, case-insensitive
        { "fullName.lastName": regex }, // Last name, case-insensitive
        { "specialisation.field": regex }, // Specialisation, case-insensitive
      ],
    });

    // Return the result
    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
