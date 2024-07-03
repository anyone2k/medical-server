// TODO: Custom Error Handler to be finished
const errorHandler = (err, req, res, next) => {
  console.log(err.name);
  console.log(err.message.red);
  console.log(err.stack.red);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Server Error",
  });
};

module.exports = errorHandler;
