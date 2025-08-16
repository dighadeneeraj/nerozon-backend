// /middlewares/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err); // For debugging in dev

  let statusCode = err.statusCode || 500;
  let errors = [];

  // Joi Validation Error
  if (err.isJoi) {
    statusCode = 400;
    errors = err.details.map(detail => ({
      field: detail.context.key,
      message: detail.message
    }));
  }

  // Mongoose Validation Error
  else if (err.name === "ValidationError") {
    statusCode = 400;
    errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message
    }));
  }

  // Mongo Duplicate Key Error
  else if (err.code && err.code === 11000) {
    statusCode = 400;
    errors = Object.keys(err.keyValue).map(key => ({
      field: key,
      message: `${key} already exists`
    }));
  }

  // Fallback (General Errors)
  else {
    errors.push({ message: err.message || "Internal Server Error" });
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    errors
  });
};
