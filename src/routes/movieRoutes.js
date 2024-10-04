import express from 'express';
import { getMovies } from '../controllers/movieController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getMovies);

export default router;
