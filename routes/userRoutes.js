import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/profile', authMiddleware, (req, res) => {
  res.json({ msg: 'User profile' });
});

export default router;
