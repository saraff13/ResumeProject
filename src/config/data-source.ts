import { DataSource } from 'typeorm';
import { Resume } from '../entity/Resume';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'mysecretpassword',
    database: 'postgres',
    synchronize: true,
    logging: false,
    entities: [Resume], // Add all entities here
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
});
