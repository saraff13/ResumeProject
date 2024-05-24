const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

router.get('/getResumeById/:id', resumeController.getResumeById);
router.get('/getResumeByName/:name', resumeController.getResumeByName);
router.get('/getAllResumes', resumeController.getAllResumes);

router.post('/uploadResumeDetails', resumeController.uploadResumeDetails);

router.patch('/updateResumeById/:id', resumeController.updateResumeById);

router.delete('/deleteResumeById/:id', resumeController.deleteResumeById);

module.exports = router;
