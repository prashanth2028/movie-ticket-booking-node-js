import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import adminMovieRoutes from './routes/adminMovieRoutes.js'; // Admin movie routes
import movieRoutes from './routes/movieRoutes.js'; // User movie viewing routes

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/admin/movies', adminMovieRoutes); // Admin movie routes
app.use('/api/movies', movieRoutes); // User movie viewing routes

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
