import 'reflect-metadata';
import { AppDataSource } from './config/data-source';
import express from 'express';
import { json } from 'body-parser';

// if I import this from index.js then route will add prefix '/api/resumes/' before resumeRoutes as we have defined app.use below and router.use in index.js
import resumeRoutes from './routes/resumes';

const app = express();

app.use(json());

// this will add prefix '/api' in resumeRoutes
app.use('/api', resumeRoutes);

const PORT = process.env.PORT || 3000;

// uncomment this if using models
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// comment this if using models
AppDataSource.initialize().then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => console.log('TypeORM connection error: ', error));