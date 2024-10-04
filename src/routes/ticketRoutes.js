import express from 'express';
import { bookTicket, getUserTickets } from '../controllers/ticketController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/book', authMiddleware ,bookTicket);
router.get('/my-tickets', authMiddleware, getUserTickets);

export default router;
