import Ticket from '../models/ticketModel.js';
import Movie from '../models/movieModel.js';

export const bookTicket = async (req, res) => {
  const { movieId,user, seats,showtimes } = req.body;
  try {
    console.log(req.body)
    const movie = await Movie.findById(movieId);
   
    if (!movie) return res.status(404).json({ msg: 'Movie not found' });

    const totalPrice = movie.price * seats;

    const ticket = await Ticket.create({
      movie: movieId,
      showtime:showtimes,
      user,
      seats,
      totalPrice
    });

    console.log("tickets:",ticket);
    

   return res.json({ msg: 'Ticket booked successfully', ticket });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

export const getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id }).populate('movie');
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
