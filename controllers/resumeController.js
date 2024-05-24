const { v4: uuidv4 } = require('uuid');
const resumeModel = require('../models/resumeModel');

const uploadResumeDetails = async (req, res) => {
    const { name, current_job_title, current_job_description, current_job_company } = req.body;

    if (!name || !name.includes(' ')) {
        return res.status(400).json({ error: 'Name must contain both first name and last name separated by a space' });
    }

    const resume_id = uuidv4();

    try {
        const newResumeId = await resumeModel.createResume(resume_id, name, current_job_title, current_job_description, current_job_company);
        res.status(201).json({ resume_id: newResumeId });
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error storing data');
    }
};

const getResumeById = async (req, res) => {
    const resume_id = req.params.id;

    try {
        const resume = await resumeModel.getResumeById(resume_id);
        if (!resume) {
            return res.status(404).json({ error: 'Resume not found' });
        }
        res.json(resume);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error retrieving data');
    }
};

const getResumeByName = async (req, res) => {
    const encodedName = req.params.name;
    const decodedName = decodeURIComponent(encodedName).replace('+', ' ');

    if (!decodedName || !decodedName.includes(' ')) {
        return res.status(400).json({ error: 'Name must contain both first name and last name separated by a space' });
    }

    try {
        const [firstName, lastName] = decodedName.split(' ');
        const resumes = await resumeModel.getResumesByName(firstName, lastName);
        res.json(resumes);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error retrieving data');
    }
};

const deleteResumeById = async (req, res) => {
    const resume_id = req.params.id;
    try {
        const resumes = await resumeModel.deleteResumeById(resume_id);
        if (resumes.length === 0) {
            return res.status(404).json({ error: 'Resume not found' });
        }
        res.status(200).json({message: 'Resume deleted successfully'});
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error deleting data');
    }
};

module.exports = {
    uploadResumeDetails,
    getResumeById,
    getResumeByName,
    deleteResumeById,
};
