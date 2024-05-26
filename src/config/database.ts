import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'resume_database',
    password: 'resume@123',
    port: 5432,
});

export default pool;