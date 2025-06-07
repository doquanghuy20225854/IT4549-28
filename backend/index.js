import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/AuthRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config()

const app = express();
const port = process.env.PORT || 3002;
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

// Middleware để log cookie cho debugging
app.use((req, res, next) => {
  console.log('Cookies:', req.cookies);
  next();
});

app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose.connect(databaseUrl)
  .then(() => console.log('Connected to DB successfully'))
  .catch((error) => console.log(error.message));
