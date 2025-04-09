import '../App.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { motion } from 'framer-motion';
import StarRating from '../components/StarRating';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [collaborativeMovies, setCollaborativeMovies] = useState<Movie[]>([]);

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
        console.error('Error fetching movie:', error);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      if (!movie) return;
      try {
        const response = await fetch(
          `https://localhost:5000/contentrecommendations/${movie.show_id}`
        );
        if (!response.ok) throw new Error('Failed to fetch similar IDs.');
        const recData = await response.json();

        const ids = [
          recData.recommendation1,
          recData.recommendation2,
          recData.recommendation3,
          recData.recommendation4,
          recData.recommendation5,
          recData.recommendation6,
        ];

        const movies: Movie[] = await Promise.all(
          ids.map(async (recId) => {
            const res = await fetch(
              `https://localhost:5000/Movie/GetMovieById/${recId}`
            );
            if (!res.ok) return null;
            return await res.json();
          })
        );

        // Filter out any nulls (in case a movie ID wasn't found)
        setSimilarMovies(movies.filter((m): m is Movie => m !== null));
      } catch (error) {
        console.error('Error fetching similar movies:', error);
      }
    };

    fetchSimilarMovies();
  }, [movie]);

  useEffect(() => {
    const fetchCollaborativeRecommendations = async () => {
      if (!movie) return;
      try {
        const response = await fetch(
          `https://localhost:5000/collaborativerecommendations/${movie.show_id}`
        );
        if (!response.ok)
          throw new Error('Failed to fetch collaborative recs.');
        const data = await response.json();

        const ids = [
          data.recommendation1,
          data.recommendation2,
          data.recommendation3,
          data.recommendation4,
          data.recommendation5,
          data.recommendation6,
        ];

        const movies: Movie[] = await Promise.all(
          ids.map(async (recId: string) => {
            const res = await fetch(
              `https://localhost:5000/Movie/GetMovieById/${recId}`
            );
            if (!res.ok) return null;
            return await res.json();
          })
        );

        setCollaborativeMovies(movies.filter((m): m is Movie => m !== null));
      } catch (error) {
        console.error('Error fetching collaborative recommendations:', error);
      }
    };

    fetchCollaborativeRecommendations();
  }, [movie]);

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
            src={`https://inteximages.blob.core.windows.net/movie-posters-2/${encodeURIComponent(movie.title)}.jpg`}
            alt={movie.title}
            className="movie-poster"
            style={{
              width: '250px',
              height: '375px',
              objectFit: 'cover',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            }}
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
            {movie.categories && (
              <p>
                <strong>Genres:</strong> {movie.categories.join(', ')}
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
        {movie && <StarRating showId={movie.show_id} userId={1} />}

        {/* === SIMILAR MOVIES SECTION === */}
        <div className="recommendation-section">
          <h3>Similar Movies</h3>
          <div className="recommendation-row">
            {similarMovies.map((sim) => (
              <div
                key={sim.show_id}
                className=""
                onClick={() => navigate(`/movie/${sim.show_id}`)}
                style={{
                  width: '140px',
                  height: '210px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
              >
                <img
                  src={`https://inteximages.blob.core.windows.net/movie-posters-2/${encodeURIComponent(sim.title)}.jpg`}
                  alt={sim.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    borderRadius: '12px',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        {/* === COLLABORATIVE RECOMMENDATIONS SECTION === */}
        <div className="recommendation-section">
          <h3>Users Also Watched</h3>
          <div className="recommendation-row">
            {collaborativeMovies.length === 0 ? (
              <p>Loading collaborative picks...</p>
            ) : (
              collaborativeMovies.map((m) => (
                <div
                  key={m.show_id}
                  className=""
                  onClick={() => navigate(`/movie/${m.show_id}`)}
                  style={{
                    cursor: 'pointer',
                    width: '140px',
                    height: '210px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  }}
                >
                  <img
                    src={`https://inteximages.blob.core.windows.net/movie-posters-2/${encodeURIComponent(m.title)}.jpg`}
                    alt={m.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieDetailPage;
