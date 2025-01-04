import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import {
    createExercice,
    getExercice,
    updateExercice,
    deleteExercice,
} from './exercice.controller.js';
import { createExerciceLog } from './log/exercice-log.controller.js';
const router = express.Router();

router
    .route('/')
    .post(protect, createExercice)
    .get(protect, getExercice);
router
    .route('/:id')
    .put(protect, updateExercice)
    .delete(protect, deleteExercice);
router
    .route('/log/:exerciceId')
    .post(protect, createExerciceLog);
export default router;
