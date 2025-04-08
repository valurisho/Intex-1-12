import '../App.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie'; // Adjust if needed
// const [userRating, setUserRating] = useState<number | null>(null);

// const handleRatingChange = (rating: number) => {
//   setUserRating(rating);
//   // TODO: MAKE IT SO IT SENDS THE RATING TO THE BACKEND
// };

const MovieDetailPage = () => {
  const { id } = useParams();
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
    <div style={{ padding: '2rem' }}>
      <h2>{movie.title}</h2>
      <img
        src={`https://localhost:5000/posters/${encodeURIComponent(movie.title)}.jpg`}
        alt={movie.title}
        width="300"
        height="450"
        style={{ borderRadius: '10px', objectFit: 'cover' }}
      />
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

      {movie.release_year ? (
        <p>
          <strong>Release Year:</strong> {movie.release_year}
        </p>
      ) : (
        <p>
          <strong>Release Year:</strong> Unknown
        </p>
      )}

      {movie.duration ? (
        <p>
          <strong>Duration:</strong> {movie.duration}
        </p>
      ) : (
        <p>
          <strong>Duration:</strong> Unknown
        </p>
      )}

      {movie.description && (
        <p>
          <strong>Description:</strong> {movie.description}
        </p>
      )}

      {movie.rating !== null && movie.rating !== undefined && (
        <p>
          <strong>Rating:</strong> {movie.rating}
        </p>
      )}
      {/*RATING INPUT ISN'T DONE */}
      <div style={{ marginTop: '1rem' }}>
        <strong>Your Rating:</strong>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <label key={star}>
              <input
                type="radio"
                name="userRating"
                value={star}
                // onChange={() => handleRatingChange(star)}
              />
              <span>★</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
