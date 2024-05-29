import { Router } from 'express';
const router = Router();
import resumeRoutes from './resumes';
import authRoutes from './auth';

router.use('/resumes', resumeRoutes);
router.use('/auth', authRoutes);

export default router;
