import Ticket from '../models/ticketModel.js';
import Movie from '../models/movieModel.js';
import {successResponse , errorResponse} from '../config/response.js';
import { mailSender } from '../services/send-email.js';
import User from '../models/userModel.js';
import stripe from '../utils/stripe.js';

export const bookTicket = async (req, res) => {
  const { movieId,user, seats,showtimes} = req.body;
  try {
    console.log(req.body)
    const movie = await Movie.findById(movieId);
    const userMail = await User.findById(user);
    if (!movie) return errorResponse(res, 404, "Movie not found");

    const totalPrice = movie.price * seats;

    const ticket = new Ticket({
      movie: movieId,
      showtime:showtimes,
      user,
      seats,
      totalPrice,
      paymentStatus: 'pending',
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice * 100,
      currency: 'usd',
      payment_method: 'pm_card_us',
      confirm: true,
      automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never'
      }
    });

    console.log("tickets:",ticket);
    console.log('status',paymentIntent.status);
    
    if (paymentIntent.status === 'succeeded') {
      ticket.paymentStatus = 'paid';
      await ticket.save();

      // Send booking confirmation email
      const ticketSubject = "Ticket booked successfully, payment completed";
      const text = `Thank you for booking your tickets!\n\nSeats: ${seats}\nTotal Price: $${totalPrice}\n\nEnjoy the show!`;
      await mailSender(userMail.email, ticketSubject, text);

      return successResponse(res, 201, "Ticket booked successfully", paymentIntent);

    } else {
      return errorResponse(res, 400, "Payment failed", paymentIntent);
    }
    
  } catch (err) {
    console.error(err);
    return errorResponse(res, 500, "Server error", { error: err.message });
  }
};

export const getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id }).populate('movie');
    res.json(tickets);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 500, "Server error", { error: err.message });
  }
};
