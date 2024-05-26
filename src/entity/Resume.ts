import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Resume {
    @PrimaryGeneratedColumn('uuid')
    resume_id!: string;

    @Column()
    name!: string;

    @Column()
    current_job_title!: string;

    @Column()
    current_job_description!: string;

    @Column()
    current_job_company!: string;
}
