import { Router } from 'express';
const router = Router();
import { login, signup } from '../controllers/authController';

router.post('/login', login);
router.post('/signup', signup);

export default router;
