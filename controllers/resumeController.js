const { v4: uuidv4, validate: isUuid } = require('uuid');
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
    if (!isUuid(resume_id)) {
        return res.status(400).json({ error: 'Invalid resume_id format' });
    }
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
    if (!isUuid(resume_id)) {
        return res.status(400).json({ error: 'Invalid resume_id format' });
    }
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

const getAllResumes = async (req, res) => {
    const {page = 1, limit = 10} = req.query;
    const offset = (page - 1) * limit;
    try {
        const resumes = await resumeModel.getAllResumes(limit, offset);
        res.json({
            totalCount: resumes.totalCount,
            resumes: resumes.data,
            currentPage: parseInt(page, 10),
            totalPages: Math.ceil(resumes.totalCount / limit),
        });
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error fetching data');
    }
};

const updateResumeById = async (req, res) => {
    const resume_id = req.params.id;
    const updates = req.body;
    if (!isUuid(resume_id)) {
        return res.status(400).json({ error: 'Invalid resume_id format' });
    }
    if (Object.keys(updates).length === 0) {
        res.status(404).json({error: 'No fields to update'});
    }
    try {
        const resumes = await resumeModel.updateResumeById(resume_id, updates);
        if (resumes.length === 0) {
            res.status(404).json({error: 'No resume found with this id'});
        }
        res.json(resumes[0]);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error updating data');
    }
};

module.exports = {
    uploadResumeDetails,
    getResumeById,
    getResumeByName,
    deleteResumeById,
    getAllResumes,
    updateResumeById,
};
