import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`[StayNest Server] Running on http://localhost:${PORT}`);
  console.log(`[StayNest Server] Health check available at http://localhost:${PORT}/api/health`);
  console.log(`[StayNest Server] Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown handling
const handleGracefulShutdown = (signal) => {
  console.log(`\n[StayNest Server] Received ${signal}. Closing server gracefully...`);
  server.close(() => {
    console.log('[StayNest Server] Process terminated gracefully.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));
process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));
