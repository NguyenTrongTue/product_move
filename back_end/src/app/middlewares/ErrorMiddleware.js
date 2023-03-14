module.exports = function ErrorMiddleware(err, req, res, next) {
  const errorStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    message: errMessage,
    status: errorStatus,
    stack: err.stack,
  });

};
