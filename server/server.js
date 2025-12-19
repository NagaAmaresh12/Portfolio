import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mailRoutes from './routes/mailRoutes.js';

dotenv.config();

const app = express();
let origin;
if (process.env.NODE_ENV == "production") {
    origin = process.env.CLIENT_ORIGIN
}
else if (process.env.NODE_ENV == "development") {
    origin = process.env.CLIENT_ORIGIN || "http://localhost:5173"
}
// Middleware
app.use(cors({
    origin,
    methods: ['POST'],
    credentials: true,
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Routes
app.use('/api/mail', mailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
