import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mailRoutes from './routes/mailRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT,
    methods: ['POST'],
    credentials: true,
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Routes
app.use('/api/mail', mailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
