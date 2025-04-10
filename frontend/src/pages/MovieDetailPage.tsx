import './MovieDetailPage.css';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { motion } from 'framer-motion';
import StarRating from '../components/StarRating';
import defaultPoster from '../assets/Intexfun.png';
import Cookies from 'js-cookie';


const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [collaborativeMovies, setCollaborativeMovies] = useState<Movie[]>([]);
  const [isContinueWatching, setIsContinueWatching] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://localhost:5000/Movie/GetMovieById/${id}`,
          { credentials: 'include' }
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
    if (movie?.show_id) {
      const list = Cookies.get('continueWatchingList');
      const parsed = list ? JSON.parse(list) : [];
      setIsContinueWatching(parsed.includes(movie.show_id));
    }
  }, [movie]);
  

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      if (!movie) return;
      try {
        const response = await fetch(
          `https://localhost:5000/contentrecommendations/${movie.show_id}`,
          { credentials: 'include' }
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
              `https://localhost:5000/Movie/GetMovieById/${recId}`,
              { credentials: 'include' }
            );
            if (!res.ok) return null;
            return await res.json();
          })
        );

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
          `https://localhost:5000/collaborativerecommendations/${movie.show_id}`,
          { credentials: 'include' }
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
              `https://localhost:5000/Movie/GetMovieById/${recId}`,
              { credentials: 'include' }
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

  const formatBlobUrl = (title: string): string =>
    `https://inteximages.blob.core.windows.net/movie-posters-2/${title
      .replace(/[^\w\s]/gi, '')
      .trim()}.jpg`;

  return (
    <motion.div
      className="movie-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="main-header">
        <div className="main-logo">
          <Link to="/mainPage">
            <img src="/logo.png" alt="CineNiche Logo" />
          </Link>
        </div>

        <div className="main-nav">
          <Link to="/privacy-policy" className="main-link">
            Privacy
          </Link>
        </div>
      </div>

      <div className="movie-card">
        <button
          onClick={() => navigate('/mainPage')}
          className="close-button"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="movie-header">
          <img
            src={formatBlobUrl(movie.title)}
            alt={movie.title}
            className="movie-poster"
            style={{
              width: '250px',
              height: '375px',
              objectFit: 'cover',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = defaultPoster;
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

          <button
            className="watch-now-button"
            onClick={() => {
              const current = Cookies.get('continueWatchingList');
              const parsed = current ? JSON.parse(current) : [];
              const updated = Array.from(new Set([movie.show_id, ...parsed]));
              Cookies.set('continueWatchingList', JSON.stringify(updated), {
                expires: 7,
              });
              setIsContinueWatching(true);
              alert('🎬 Watch feature coming soon!');
            }}
          >
            {isContinueWatching ? '⏯ Continue Watching' : '▶ Watch Now'}
          </button>

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
                onClick={() => navigate(`/movie/${sim.show_id}`)}
                style={{
                  width: '140px',
                  height: '210px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
              >
                <img
                  src={formatBlobUrl(sim.title)}
                  alt={sim.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px',
                  }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = defaultPoster;
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* === USERS ALSO WATCHED SECTION === */}
        {collaborativeMovies.length > 0 && (
          <div className="recommendation-section">
            <h3>Users Also Watched</h3>
            <div className="recommendation-row">
              {collaborativeMovies.map((m) => (
                <div
                  key={m.show_id}
                  onClick={() => navigate(`/movie/${m.show_id}`)}
                  style={{
                    cursor: 'pointer',
                    width: '140px',
                    height: '210px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  }}
                >
                  <img
                    src={formatBlobUrl(m.title)}
                    alt={m.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = defaultPoster;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MovieDetailPage;
