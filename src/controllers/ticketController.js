import Ticket from '../models/ticketModel.js';
import Movie from '../models/movieModel.js';
import {successResponse , errorResponse} from '../config/response.js';

export const bookTicket = async (req, res) => {
  const { movieId,user, seats,showtimes } = req.body;
  try {
    console.log(req.body)
    const movie = await Movie.findById(movieId);
   
    if (!movie) return errorResponse(res, 404, "Movie not found");

    const totalPrice = movie.price * seats;

    const ticket = await Ticket.create({
      movie: movieId,
      showtime:showtimes,
      user,
      seats,
      totalPrice
    });

    console.log("tickets:",ticket);
    
    return successResponse(res, 201, "Ticket booked successfully", ticket);
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
