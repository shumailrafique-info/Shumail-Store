exports.errorMiddleware = (err, req, res, next) => {
  var message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    message = `Dublicate ${Object.keys(err.keyValue)} entered`;
  }
  res.status(statusCode).json({
    success: false,
    message,
  });
};
