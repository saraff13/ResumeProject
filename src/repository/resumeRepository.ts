import { AppDataSource } from '../config/data-source';
import { Resume } from '../entity/Resume';

const duplicateResume = async (name: string, current_job_title: string, current_job_description: string, current_job_company: string) => {
    const resumeRepository = AppDataSource.getRepository(Resume);
    return await resumeRepository.find({
        where: { name, current_job_title, current_job_description, current_job_company }
    });
};

const createResume = async (resume_id: string, name: string, current_job_title: string, current_job_description: string, current_job_company: string) => {
    const resumeRepository = AppDataSource.getRepository(Resume);
    const resume = resumeRepository.create({ resume_id, name, current_job_title, current_job_description, current_job_company });
    await resumeRepository.save(resume);
    return resume.resume_id;
};

const getResumeById = async (resume_id: string) => {
    const resumeRepository = AppDataSource.getRepository(Resume);
    const resume = await resumeRepository.findOneBy({ resume_id });
    return resume;
};

const getResumesByName = async (firstName: string, lastName: string) => {
    const resumeRepository = AppDataSource.getRepository(Resume);
    let resumes = await resumeRepository.find({
        where: { name: `${firstName} ${lastName}` }
    });
    if (resumes.length === 0) {
        resumes = await resumeRepository
            .createQueryBuilder('resume')
            .where('resume.name ILIKE :firstName OR resume.name ILIKE :lastName', { firstName: `%${firstName}%`, lastName: `%${lastName}%` })
            .getMany();
    }
    return resumes;
};

const deleteResumeById = async (resume_id: string) => {
    const resumeRepository = AppDataSource.getRepository(Resume);
    const resume = await resumeRepository.findOneBy({ resume_id });
    if (resume) {
        await resumeRepository.remove(resume);
        return resume;
    }
    return null;
};

const getAllResumes = async (limit: number, offset: number) => {
    const resumeRepository = AppDataSource.getRepository(Resume);
    const [data, totalCount] = await resumeRepository.findAndCount({
        order: { name: 'ASC' },
        take: limit,
        skip: offset
    });
    return {
        totalCount,
        data
    };
};

const updateResumeById = async (resume_id: string, updates: Partial<Resume>) => {
    const resumeRepository = AppDataSource.getRepository(Resume);
    await resumeRepository.update(resume_id, updates);
    const resume = await resumeRepository.findOneBy({ resume_id });
    return resume;
};

export {
    createResume,
    duplicateResume,
    updateResumeById,
    getAllResumes,
    getResumeById,
    getResumesByName,
    deleteResumeById
};
