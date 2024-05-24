const express = require('express');
const bodyParser = require('body-parser');

// if I import this from index.js then route will add prefix '/api/resumes/' before resumeRoutes as we have defined app.use below and router.use in index.js
const resumeRoutes = require('./routes/resumes'); 

const app = express();

app.use(bodyParser.json());

// this will add prefix '/api' in resumeRoutes
app.use('/api', resumeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
