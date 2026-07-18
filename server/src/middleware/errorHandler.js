export function errorHandler(err, req, res, next) {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { details: err.message }),
  });
}