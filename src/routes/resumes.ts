import { Router } from 'express';
const router = Router();
import { getResumeById, getResumeByName, getAllResumes, uploadResumeDetails, updateResumeById, deleteResumeById } from '../controllers/resumeController';

router.get('/getResumeById/:id', getResumeById);
router.get('/getResumeByName/:name', getResumeByName);
router.get('/getAllResumes', getAllResumes);

router.post('/uploadResumeDetails', uploadResumeDetails);

router.patch('/updateResumeById/:id', updateResumeById);

router.delete('/deleteResumeById/:id', deleteResumeById);

export default router;
