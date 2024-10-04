import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  duration: { type: Number, required: true }, // in minutes
  showtimes: [{ type: Date }],
  price: { type: Number, required: true },
});

const Movie = mongoose.model('Movie', MovieSchema);
export default Movie;
