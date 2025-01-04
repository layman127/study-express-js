import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import {
    createExercice,
    getExercice,
    updateExercice,
    deleteExercice,
} from './exercice.controller.js';
import { createExerciceLog } from './log/exercice-log.controller.js';
import { getExerciceLog } from './log/get-exercise-log.controller.js';
import {
    completeExerciceLog,
    updateExerciceLogtime,
} from './log/update-exercice-log.controller.js';
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
router.route('/log/:Id').get(protect, getExerciceLog);
router
    .route('/log/complete/:id')
    .patch(protect, completeExerciceLog);
router
    .route('/log/time/:id')
    .put(protect, updateExerciceLogtime);
export default router;
