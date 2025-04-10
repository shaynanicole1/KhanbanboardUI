import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js'; // your JWT middleware

const router = Router();

// Public routes (no auth required)
router.use('/auth', authRoutes);

// ✅ Protected API routes
router.use('/api', authenticateToken, apiRoutes);

export default router;
