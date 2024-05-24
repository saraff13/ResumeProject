const express = require('express');
const router = express.Router();
const resumeRoutes = require('./resumes');

// will add prefix '/resunes' in resumeRoutes
router.use('/resumes', resumeRoutes);

module.exports = router;
