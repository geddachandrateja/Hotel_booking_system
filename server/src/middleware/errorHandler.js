/**
 * Centralized Error Handling Middleware
 * Catches all unhandled errors and returns consistent JSON responses
 */
export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Resource Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
