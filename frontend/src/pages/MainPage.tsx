import '../App.css';
import { useEffect, useState, useRef } from 'react';
import { Movie } from '../types/Movie';
import PrivacyPageFooter from '../components/PrivacyPageFooter';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);

  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const API_URL = 'https://localhost:5000/Movie';

  useEffect(() => {
    const fetchMoviesAndGenres = async () => {
      try {
        // Fetch movies
        const movieRes = await fetch(`${API_URL}/GetAllMovies`);
        if (!movieRes.ok) throw new Error('Error fetching movies');
        const movieData = await movieRes.json();
        setMovies(movieData);

        // Fetch genres
        const genreRes = await fetch(`${API_URL}/GetCategories`);
        if (!genreRes.ok) throw new Error('Error fetching genres');
        const genreData = await genreRes.json();
        setGenres(genreData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchMoviesAndGenres();
  }, []);

  // ✅ Handle outside click to close sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  // ✅ Filtered movie list
  const filteredMovies = movies.filter(
    (m: any) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedGenres.length === 0 ||
        selectedGenres.some((genre) =>
          m.listed_in?.toLowerCase().includes(genre.toLowerCase())
        ))
  );

  return (
    <>
      <div className="page-container">
        {/* Hamburger */}
        <button
          className="hamburger-btn"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>

        {/* Sidebar */}
        <div
          className={`sidebar ${isSidebarOpen ? 'open' : ''}`}
          ref={sidebarRef}
        >
          <h3>Filter by Genre</h3>

          <div className="genre-scroll-area">
            {genres.length === 0 ? (
              <p>Loading genres...</p>
            ) : (
              genres.map((genre) => (
                <label key={genre} className="genre-item">
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre)}
                    onChange={() => toggleGenre(genre)}
                  />
                  {genre}
                </label>
              ))
            )}
          </div>

          <button
            className="clear-filters-btn"
            onClick={() => setSelectedGenres([])}
          >
            Clear Filters
          </button>
        </div>

        {/* Page content */}
        <div className="content-wrap">
          {/* Recommended */}
          <div className="section-header">
            <h2>Recommended for You</h2>
          </div>
          <div className="recommended-row">
            {movies.slice(0, 10).map((m) => (
              <Link
                to={`/movie/${m.show_id}`}
                key={m.show_id}
                className="recommended-card"
              >
                <img
                  src={`https://inteximages.blob.core.windows.net/movie-posters/${encodeURIComponent(m.title)}.jpg`}
                  alt={m.title}
                  loading="lazy"
                  width="160"
                  height="240"
                  style={{ borderRadius: '8px', objectFit: 'cover' }}
                />
              </Link>
            ))}
          </div>

          {/* All Movies */}
          <div className="section-header">
            <h2>All Movies</h2>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar"
            />
          </div>

          <div className="card-container">
            {filteredMovies.map((m) => (
              <Link to={`/movie/${m.show_id}`} key={m.show_id} className="card">
                <img
                  src={`https://inteximages.blob.core.windows.net/movie-posters/${encodeURIComponent(m.title)}.jpg`}
                  alt={m.title}
                  loading="lazy"
                  width="200"
                  height="300"
                  style={{ borderRadius: '8px', objectFit: 'cover' }}
                />
              </Link>
            ))}
          </div>
        </div>

        <PrivacyPageFooter />
      </div>
    </>
  );
};

export default MainPage;
