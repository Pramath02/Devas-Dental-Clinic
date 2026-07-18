export function errorHandler(err, req, res, next) {
  console.error('Server error:', err);

  // Handle Prisma errors
  if (err.code?.startsWith('P')) {
    return res.status(400).json({
      error: 'Database error',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }

  res.status(500).json({
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
}