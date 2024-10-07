import express from 'express';
import { createMovie, updateMovie, deleteMovie } from '../controllers/movieController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';
import { movieValidator , idValidation } from '../middlewares/validations/admin-movie-validations.js';

const router = express.Router();

router.post('/create', authMiddleware, adminMiddleware, movieValidator, createMovie);
router.put('/update/:id', authMiddleware, adminMiddleware, idValidation, updateMovie);
router.delete('/delete/:id', authMiddleware, adminMiddleware, idValidation, deleteMovie);

export default router;
