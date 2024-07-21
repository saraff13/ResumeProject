import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import { AppDataSource } from './config/data-source';
import express from 'express';
import { json } from 'body-parser';
import resumeRoutes from './routes/index';

const app = express();

app.use(json());
app.use('/api', resumeRoutes);

const PORT = Number(process.env.PORT) || 3000;

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