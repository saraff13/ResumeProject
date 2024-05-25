import { Router } from 'express';
const router = Router();
import resumeRoutes from './resumes';

// will add prefix '/resunes' in resumeRoutes
router.use('/resumes', resumeRoutes);

export default router;
