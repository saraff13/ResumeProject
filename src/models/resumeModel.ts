
import pool from '../config/database';

const duplicateResume = async (name: string, current_job_title: string, current_job_description: string, current_job_company: string) => {
    const query = 'SELECT * FROM resumes WHERE name = $1 AND current_job_title = $2 AND current_job_description = $3 AND current_job_company = $4';
    const result = await pool.query(query, [name, current_job_title, current_job_description, current_job_company]);
    return result.rows;
};

const createResume = async (resume_id: string, name: string, current_job_title: string, current_job_description: string, current_job_company: string) => {
    const query = 'INSERT INTO resumes (resume_id, name, current_job_title, current_job_description, current_job_company) VALUES ($1, $2, $3, $4, $5) RETURNING resume_id';
    const values = [resume_id, name, current_job_title, current_job_description, current_job_company];
    const result = await pool.query(query, values);
    return result.rows[0].resume_id;
};

const getResumeById = async (resume_id: string) => {
    const query = 'SELECT * FROM resumes WHERE resume_id = $1';
    const result = await pool.query(query, [resume_id]);
    return result.rows[0];
};

const getResumesByName = async (firstName: string, lastName: string) => {
    let query = 'SELECT * FROM resumes WHERE name = $1';
    let result = await pool.query(query, [`${firstName} ${lastName}`]);
    if (result.rows.length === 0) {
        query = 'SELECT * FROM resumes WHERE name ILIKE $1 OR name ILIKE $2';
        result = await pool.query(query, [`%${firstName}%`, `%${lastName}%`]);
    }
    return result.rows;
};

const deleteResumeById = async (resume_id: string) => {
    const query = 'DELETE FROM resumes WHERE resume_id = $1 RETURNING *';
    const result = await pool.query(query, [resume_id]);
    return result.rows;
};

const getAllResumes = async (limit: number, offset: number) => {
    const resultQuery = 'SELECT * FROM resumes ORDER BY name LIMIT $1 OFFSET $2';
    const countQuery = 'SELECT COUNT(*) FROM resumes';
    const result = await pool.query(resultQuery, [limit, offset]);
    const countResult = await pool.query(countQuery, []);
    const totalCount = parseInt(countResult.rows[0].count, 10);
    return {
        totalCount,
        data: result.rows,
    };
};

const updateResumeById = async (resume_id: string, updates: any) => {
    const updateFields: string[] = [];
    const updateValues = [];
    Object.entries(updates).forEach(([key, value], index) => {
        updateFields.push(`${key} = $${index + 1}`);
        updateValues.push(value);
    });
    updateValues.push(resume_id);
    const query = `UPDATE resumes SET ${updateFields.join(', ')} WHERE resume_id = $${updateValues.length} RETURNING *`;
    const result = await pool.query(query, updateValues);
    console.log('updateResumeById => ', updateFields, updateValues, query, result);
    return result.rows;
};

export {
    createResume,
    duplicateResume,
    updateResumeById,
    getAllResumes,
    getResumeById,
    getResumesByName,
    deleteResumeById,
};