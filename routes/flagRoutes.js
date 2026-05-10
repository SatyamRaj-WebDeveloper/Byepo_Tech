import express from 'express';
import { createFlag, getFlags, updateFlag, checkFlag } from '../controllers/flagController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/check', checkFlag);


router.route('/')
  .post(protect, authorize('ORG_ADMIN'), createFlag)
  .get(protect, authorize('ORG_ADMIN'), getFlags);

router.route('/:id')
  .put(protect, authorize('ORG_ADMIN'), updateFlag);

export default router;