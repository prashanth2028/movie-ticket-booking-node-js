import Movie from '../models/movieModel.js';

// Admin creates a new movie
export const createMovie = async (req, res) => {
  const { title, description, duration, price, showtimes } = req.body;
  try {
    const movie = new Movie({
      title,
      description,
      duration,
      price,
      showtimes,
    });
    await movie.save();
    res.json({ msg: 'Movie created successfully', movie });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Admin updates an existing movie
export const updateMovie = async (req, res) => {
  const { title, description, duration, price, showtimes } = req.body;
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) return res.status(404).json({ msg: 'Movie not found' });

    movie.title = title || movie.title;
    movie.description = description || movie.description;
    movie.duration = duration || movie.duration;
    movie.price = price || movie.price;
    movie.showtimes = showtimes || movie.showtimes;

    await movie.save();
    res.json({ msg: 'Movie updated successfully', movie });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Admin deletes a movie
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.movieId);
    if (!movie) return res.status(404).json({ msg: 'Movie not found' });

    res.json({ msg: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// List all movies (for both users and admins)
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
