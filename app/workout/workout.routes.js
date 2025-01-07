import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import {
    createWorkout,
    getWorkout,
    updateWorkout,
    deleteWorkout,
    getWorkouts,
} from './workout.controller.js';
import { createWorkoutLog } from '../workout/log/workout-log.controller.js';
const router = express.Router();

router
    .route('/')
    .get(protect, getWorkouts)
    .post(protect, createWorkout);
router
    .route('/:id')
    .get(protect, getWorkout)
    .put(protect, updateWorkout)
    .post(protect, createWorkout)
    .delete(protect, deleteWorkout);
router
    .route('/log/:workoutId')
    .post(protect, createWorkoutLog);
export default router;
