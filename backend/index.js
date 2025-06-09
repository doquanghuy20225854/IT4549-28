import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/AuthRoutes.js';
import petRoutes from './routes/PetRoutes.js';
import userRoutes from './routes/UserRoutes.js';
import serviceRoutes from './routes/ServiceRoutes.js';
import mediaRecordRoutes from './routes/MediaRecordRoutes.js';
import appointmentRoutes from './routes/AppointmentRoutes.js';

dotenv.config()

const app = express();
const port = process.env.PORT || 3001;
const databaseUrl = process.env.DATABASE_URL;

// Cấu hình CORS trước các middleware khác
app.use(
  cors({
    origin: process.env.ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    exposedHeaders: ['set-cookie']
  })
);

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/media-records', mediaRecordRoutes);
app.use('/api/appointments', appointmentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose.connect(databaseUrl)
  .then(() => console.log('Connected to DB successfully'))
  .catch((error) => console.log(error.message));
