function errorHandling(error, req, res, next) {
  if (error.name === "ValidationError") {
    const errors = Object.values(error.errors).map((val) => val.message);
    return res.status(403).json({ status: "error", errors, message: 'Bad request' });
  }
  if (error.name === "Error") {
    return res.status(403).json({ status: "error", errors: error.message });
  }

  res.status(403).json({ status: "error", errors: error.stack, message: 'Bad request' });
}

module.exports = errorHandling