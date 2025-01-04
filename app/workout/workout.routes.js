import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import {
    createWorkout,
    getWorkout,
    updateWorkout,
    deleteWorkout,
    getWorkouts,
} from './workout.controller.js';
const router = express.Router();

router
    .route('/')
    .get(protect, getWorkouts)
    .post(protect, createWorkout);
router
    .route('/:id')
    .get(protect, getWorkout)
    .put(protect, updateWorkout)
    .delete(protect, deleteWorkout);
export default router;
