import express from 'express';
import { getCurrentUserProfile } from './user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

//можно прямо в роутер прописать мидлвейр
router
    .route('/profile')
    .get(protect, getCurrentUserProfile);
export default router;
