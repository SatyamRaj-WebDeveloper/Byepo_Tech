import express from 'express';
import { loginUser, registerOrgAdmin } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', registerOrgAdmin);

export default router;