// Resume assignment start -----------------------------

/*
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');

// PostgreSQL database configuration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'mysecretpassword',
    port: 5432,
});

const app = express();

app.use(bodyParser.json());

// POST endpoint to accept JSON data and store it in PostgreSQL
app.post('/api/uploadResumeDetails', async (req, res) => {
    const { name, current_job_title, current_job_description, current_job_company } = req.body;

    // Check if name contains both first_name and last_name separated by a space
    if (!name || !name.includes(' ')) {
        return res.status(400).json({ error: 'Name must contain both first name and last name separated by a space' });
    }

    // Generate a random UUID for resume_id
    const resume_id = uuidv4();

    try {
        const result = await pool.query('INSERT INTO resumes (resume_id, name, current_job_title, current_job_description, current_job_company) VALUES ($1, $2, $3, $4, $5) RETURNING resume_id', [resume_id, name, current_job_title, current_job_description, current_job_company]);
        res.status(201).json({ resume_id });
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error storing data');
    }
});

// GET endpoint to retrieve data from PostgreSQL
app.get('/api/getResumeById/:id', async (req, res) => {
    const resume_id = req.params.id;

    try {
        const result = await pool.query('SELECT * FROM resumes WHERE resume_id = $1', [resume_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Resume not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error retrieving data');
    }
});

// GET endpoint to retrieve data from PostgreSQL by name
app.get('/api/getResumeByName/:name', async (req, res) => {
    const encodedName = req.params.name;
    const decodedName = decodeURIComponent(encodedName).replace('+', ' ');

    // Check if name contains both first_name and last_name separated by a space
    if (!decodedName || !decodedName.includes(' ')) {
        return res.status(400).json({ error: 'Name must contain both first name and last name separated by a space' });
    }

    try {
        const [firstName, lastName] = decodedName.split(' ');

        // Search for an exact match for the full name
        let result = await pool.query('SELECT * FROM resumes WHERE name = $1', [decodedName]);
        if (result.rows.length === 0) {
            // If no exact match, fetch all resumes with the same first name and last name
            result = await pool.query('SELECT * FROM resumes WHERE name ILIKE $1 OR name ILIKE $2', [`%${firstName}%`, `%${lastName}%`]);
        }
        res.json(result.rows);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error retrieving data');
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
*/

// Resume assignment end ----------------------------------


// Resume assignment in structured format below

const express = require('express');
const bodyParser = require('body-parser');

// if I import this from index.js then route will add prefix '/api/resumes/' before resumeRoutes as we have defined app.use below and router.use in index.js
const resumeRoutes = require('./routes/resumes'); 

const app = express();

app.use(bodyParser.json());

// will add prefix '/api' in resumeRoutes
app.use('/api', resumeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
