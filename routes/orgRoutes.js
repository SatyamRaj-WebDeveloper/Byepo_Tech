import express from 'express';
import { createOrganization, getOrganizations } from '../controllers/orgController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();


router.route('/')
  .post(protect, authorize('SUPER_ADMIN'), createOrganization)
  .get(protect, authorize('SUPER_ADMIN'), getOrganizations);

export default router;