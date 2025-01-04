import express from 'express';
import { authUser, registationUser } from './auth.controller.js';
const router = express.Router();

router.route('/login').post(authUser);
router.route('/registration').post(registationUser);
export default router;
