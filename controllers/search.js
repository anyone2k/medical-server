const asyncHandler = require("../middleware/async");
const Hospital = require("../Models/Hospital");
exports.getSearch = asyncHandler(async (req, res, next) => {
  // create a search query
  let query = req.query.search;
  // search for the query in the database
  const hospitals = await Hospital.find({
    $or: [{ name: { $regex: query } }],
  }).select("name location");

  // return the result
  res.status(200).json({
    success: true,
    count: hospitals.length,
    data: hospitals,
  });
});
