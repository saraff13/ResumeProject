import { DataSource } from 'typeorm';
import { Resume } from '../entity/Resume';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'resume@123',
    database: 'resume_database',
    synchronize: true,
    logging: false,
    entities: [Resume],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    extra: {
        max: 10,
        min: 2,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    },
});
