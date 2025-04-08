import '../App.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { motion } from 'framer-motion';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://localhost:5000/Movie/GetMovieById/${id}`
        );
        if (!response.ok) throw new Error('Failed to fetch movie.');
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <motion.div
      className="movie-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          backgroundColor: '#1f2937',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          fontSize: '1.2rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        }}
      >
        ←
      </button>

      <div className="movie-card">
        <div className="movie-header">
          <img
            src={`https://inteximages.blob.core.windows.net/movie-posters/${encodeURIComponent(movie.title)}.jpg`}
            alt={movie.title}
            className="movie-poster"
          />
          <div className="movie-details">
            <h2>{movie.title}</h2>
            {movie.director && (
              <p>
                <strong>Director:</strong> {movie.director}
              </p>
            )}
            {movie.cast && (
              <p>
                <strong>Cast:</strong> {movie.cast}
              </p>
            )}
            {movie.type && (
              <p>
                <strong>Type:</strong> {movie.type}
              </p>
            )}
            {movie.country && (
              <p>
                <strong>Country:</strong> {movie.country}
              </p>
            )}
            <p>
              <strong>Release Year:</strong> {movie.release_year ?? 'Unknown'}
            </p>
            <p>
              <strong>Duration:</strong> {movie.duration ?? 'Unknown'}
            </p>
            {movie.rating !== null && movie.rating !== undefined && (
              <p>
                <strong>Rating:</strong> {movie.rating}
              </p>
            )}
          </div>
        </div>
        {movie.description && (
          <div className="movie-description">
            <p>
              <strong>Description:</strong> {movie.description}
            </p>
          </div>
        )}
        <div className="rating-section">
          <strong>Your Rating:</strong>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star}>
                <input type="radio" name="userRating" value={star} />
                <span>★</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieDetailPage;
