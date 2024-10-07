import express from 'express';
import { bookTicket, getUserTickets } from '../controllers/ticketController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { ticketValidator } from '../middlewares/validations/ticket-validations.js';

const router = express.Router();

router.post('/book', authMiddleware , ticketValidator , bookTicket);
router.get('/my-tickets', authMiddleware, getUserTickets);

export default router;
