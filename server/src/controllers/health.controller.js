/**
 * Health Check Controller
 * Provides system status, uptime, and environment information
 */
export const getHealthStatus = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'StayNest API server is operational and healthy',
    data: {
      service: 'StayNest Backend API',
      version: '1.0.0',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    }
  });
};
