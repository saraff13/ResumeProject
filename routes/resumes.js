const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

router.post('/uploadResumeDetails', resumeController.uploadResumeDetails);
router.get('/getResumeById/:id', resumeController.getResumeById);
router.get('/getResumeByName/:name', resumeController.getResumeByName);
router.delete('/deleteResumeById/:id', resumeController.deleteResumeById);
router.get('/getAllResumes', resumeController.getAllResumes);

module.exports = router;
