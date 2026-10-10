import express from 'express';
import { getHealthStatus } from '../controllers/health.controller.js';

const router = express.Router();

/**
 * @route   GET /api/health
 * @desc    Check API server health and status
 * @access  Public
 */
router.get('/', getHealthStatus);

export default router;
