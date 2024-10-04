import express from 'express';
import { createMovie, updateMovie, deleteMovie } from '../controllers/movieController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, adminMiddleware, createMovie);
router.put('/update/:movieId', authMiddleware, adminMiddleware, updateMovie);
router.delete('/delete/:movieId', authMiddleware, adminMiddleware, deleteMovie);

export default router;
