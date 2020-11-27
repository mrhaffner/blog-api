import { Router } from 'express';
const router = Router();
import * as authController from '../controllers/authController'

//login
router.post('/login', authController.login_auth)

//logout
router.post('/logout', authController.logout_auth)

export default router;